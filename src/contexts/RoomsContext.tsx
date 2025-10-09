import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Room, fetchRooms, CleaningRecord, fetchCleaningHistory } from '@services/rooms.service';
import { useAuth } from '@contexts/AuthContext';

interface RoomsContextData {
  rooms: Room[];
  isLoading: boolean;
  refreshRooms: () => Promise<void>;
}

const RoomsContext = createContext<RoomsContextData>({} as RoomsContextData);

function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAppLoading, isAdmin } = useAuth(); 

  const refreshRooms = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      const roomsData = await fetchRooms();

      if (isAdmin) {
        const cleaningsData = await fetchCleaningHistory();

        const roomsWithObservations = roomsData.map(room => {
          const roomCleaningRecords = cleaningsData
            .filter(cleaningRecord => cleaningRecord.sala === room.qr_code_id)
            .sort((a, b) => {
              if (!a.data_hora_fim || !b.data_hora_fim) return 0;
              return new Date(b.data_hora_fim).getTime() - new Date(a.data_hora_fim).getTime()
            });

          const recentObservation = roomCleaningRecords.length > 0 ? roomCleaningRecords[0].observacoes : undefined;

          return {
            ...room,
            recentObservation,
          };
        });

        setRooms(roomsWithObservations);
      } else {
        setRooms(roomsData);
      }

    } catch (error) {
      console.error("Failed to refresh rooms data in context:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, isAdmin]); 

  useEffect(() => {
    if (!isAppLoading && token) {
      refreshRooms();
    }
  }, [isAppLoading, token, refreshRooms]);

  return (
    <RoomsContext.Provider value={{ rooms, isLoading, refreshRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

function useRooms() {
  const context = useContext(RoomsContext);
  return context;
}

export { RoomsProvider, useRooms };