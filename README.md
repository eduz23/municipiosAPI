# municipiosAPI

# API de Municípios

Uma API REST que fornece informações sobre municípios brasileiros, com dados armazenados em banco de dados.

## Endpoints

- **GET /municipios**: Retorna uma lista de municípios com **paginações** (parâmetros `limit` e `offset`).
  - **Parâmetros**:
    - `limit`: Número máximo de municípios a retornar.
    - `offset`: Número de municípios a serem pulados.

- **DELETE /municipios/{id}**: Remove um município pelo **ID**.
  - **Parâmetros**:
    - `id`: ID do município a ser removido.

- **PATCH /municipios/{id}**: Atualiza as informações de um município pelo **ID**.
  - **Parâmetros**:
    - `id`: ID do município a ser atualizado.
    - Dados no corpo da requisição para atualização (por exemplo, nome, população, etc).
