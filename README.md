# Introdução ao Aplicativo

# Objetivo

O aplicativo é projetado para gerenciar e monitorar o status de limpeza de diferentes salas ou ambientes. Ele conecta administradores, colaboradores (que reportam a sujeira) e zeladores (que executam a limpeza), otimizando o fluxo de trabalho e garantindo o controle das tarefas.

# Perfis de usuário

O sistema opera com diferentes níveis de acesso:

- **Admin:** Gerencia usuários, salas e tem visão geral do sistema
- **Colaborador:** Pode reportar salas que precisam de limpeza.
- **Zelador:** Recebe notificações, executa e conclui as tarefas de limpeza.

---

# Funcionalidades e Uso

# **Tela de Login**

- Autenticação de usuários com e-mail/usuário e senha.
- Opção de "Ver Senha" para conferência.
- Verificação de credenciais antes de autorizar o acesso.

---

# **Tela Home**

- Dashboard principal com um resumo geral do status das tarefas.
- Exibe a quantidade de salas com limpeza pendente.
- Apresenta um gráfico com o total de salas limpas.
- Mostra a data e hora da última limpeza registrada.

---

# Tela salas

- Permite a busca por salas específicas.
- Possui um filtro para refinar a visualização.
- Abas para navegar entre salas: Pendentes, Limpas e Todas.
- Lista de salas exibindo nome e status atual (Ex: Em limpeza, Limpeza pendente, Limpa, Suja).
- Ações disponíveis: Editar, Excluir, Solicitar Limpeza e Limpar Sala.

---

# **Tela Usuários**

- Botão para "Cadastrar Funcionário" (solicita nome, senha e e-mail).
- Lista todos os usuários cadastrados no sistema.
- Diferencia os usuários por sua classe (Ex: Colaborador, Admin).

---

# **Tela Minha Conta**

- Exibe as informações do perfil do usuário logado: Foto, E-mail e Classe.
- Botão "Editar Perfil" (permite alterar a foto de perfil).
- Botão "Alterar Senha".
- Botão "Sair" para encerrar a sessão do usuário.

---

# **Tela Notificação**

- Acessada através de um ícone no *header* (presente nas telas Home, Salas e Usuários).
- Exibe notificações destinadas aos zeladores (Ex: quando uma sala é marcada como "Suja").
- Opções: Clicar para ler a mensagem ou "Marcar todas como lidas".

---

# **Tela Limpar (Zelador)**

- Funcionalidade exclusiva para o perfil "Zelador".
- Permite selecionar uma sala manualmente ou escanear o QR Code da sala.
- Ao iniciar a limpeza, exibe: horário de início, instruções de limpeza e observações.
- **Conclusão:** É obrigatório o envio de imagens da sala limpa para concluir a tarefa.

---

# **Tela Reportar Sala (Colaborador)**

- Funcionalidade exclusiva para o perfil "Colaborador".
- Permite selecionar uma sala manualmente ou escanear o QR Code da sala.
- Ação: Reportar que a sala está "Suja".<j>- Permite adicionar uma observação ao criar o relatório.

---
