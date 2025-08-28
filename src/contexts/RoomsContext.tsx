import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
// Importa a nova função e a nova interface
import { Sala, fetchSalas, LimpezaRegistro, fetchLimpezas } from '@services/rooms.service';
import { useAuth } from '@contexts/AuthContext';

interface SalasContextData {
  salas: Sala[];
  isLoading: boolean;
  refreshSalas: () => Promise<void>;
}

const SalasContext = createContext<SalasContextData>({} as SalasContextData);

function SalasProvider({ children }: { children: ReactNode }) {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAppLoading, user } = useAuth(); // Precisamos do 'user' para saber se é admin

  const refreshSalas = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      // 1. Busca a lista de salas
      const salasData = await fetchSalas();

      // 2. Se for admin, busca também o histórico de limpezas
      if (user?.is_staff) {
        const limpezasData = await fetchLimpezas();

        // 3. Combina os dados
        const salasComObservacoes = salasData.map(sala => {
          const registrosDaSala = limpezasData
            .filter(limpeza => limpeza.sala === sala.id)
            .sort((a, b) => new Date(b.data_hora_limpeza).getTime() - new Date(a.data_hora_limpeza).getTime());

          const observacao_recente = registrosDaSala.length > 0 ? registrosDaSala[0].observacoes : undefined;

          return {
            ...sala,
            observacao_recente,
          };
        });

        setSalas(salasComObservacoes);
      } else {
        // Se não for admin, apenas define as salas normais
        setSalas(salasData);
      }

    } catch (error) {
      console.error("Falha ao atualizar os dados das salas no contexto:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, user?.is_staff]); // Adiciona user.is_staff como dependência

  useEffect(() => {
    if (!isAppLoading && token) {
      refreshSalas();
    }
  }, [isAppLoading, token, refreshSalas]);

  return (
    <SalasContext.Provider value={{ salas, isLoading, refreshSalas }}>
      {children}
    </SalasContext.Provider>
  );
}

function useSalas() {
  const context = useContext(SalasContext);
  return context;
}

export { SalasProvider, useSalas };