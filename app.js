<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>TCC Hub (Online)</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="container">
    <header class="top">
      <h1>🧭 TCC Hub</h1>
      <p>Biomas • Kanban • Decisões (colaboração online)</p>

      <div class="row">
        <span class="hint" id="status">Status: aguardando…</span>
      </div>
    </header>

    <section class="card">
      <h2>Login (Google)</h2>
      <div class="row">
        <button id="btnLogin">Entrar com Google</button>
        <button class="danger" id="btnLogout">Sair</button>
      </div>
      <div class="hint" id="userInfo"></div>
    </section>

    <section class="card">
      <h2>1) Ficha do Bioma</h2>

      <div class="row">
        <div class="grow">
          <label>Selecionar bioma</label>
          <select id="biomeSelect"></select>
        </div>
        <div>
          <button id="saveBiome">Salvar bioma</button>
        </div>
      </div>

      <div class="grid2">
        <div>
          <h3>Território</h3>
          <label>Área / distribuição</label><input id="t_area" />
          <label>Estados / países</label><input id="t_estados" />
          <label>Clima</label><input id="t_clima" />
          <label>Estações</label><input id="t_estacoes" />
          <label>Regime hídrico</label><input id="t_hidrico" />
        </div>

        <div>
          <h3>Terroir gastronômico</h3>
          <label>Frutas nativas (vírgula)</label><input id="g_frutas" />
          <label>Vegetais/raízes/sementes (vírgula)</label><input id="g_vegetais" />
          <label>Proteínas típicas (vírgula)</label><input id="g_proteinas" />
          <label>Técnicas tradicionais (vírgula)</label><input id="g_tecnicas" />
          <label>Pratos emblemáticos (vírgula)</label><input id="g_pratos" />
        </div>
      </div>

      <div class="grid2">
        <div>
          <h3>Cultura</h3>
          <label>Música / ritmos</label><input id="c_musica" />
          <label>Manifestações culturais</label><input id="c_manifestacoes" />
        </div>

        <div>
          <h3>Imaginário</h3>
          <label>Encantados citados (vírgula)</label><input id="encantados" />
          <label>Notas do bioma</label><textarea id="notes"></textarea>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>2) Kanban (tarefas do grupo)</h2>

      <div class="grid2">
        <div>
          <label>Tarefa</label>
          <input id="task_title" placeholder="Ex: Pesquisar frutas do Cerrado" />
        </div>
        <div>
          <label>Responsável</label>
          <input id="task_owner" placeholder="Ex: Membro 3" />
        </div>
      </div>

      <div class="row">
        <button id="addTask">Adicionar tarefa</button>
        <span class="hint">Arraste cards entre colunas</span>
      </div>

      <div class="kanban">
        <div class="col" data-col="todo">
          <h3>A Fazer</h3><div class="drop">solte aqui</div><div class="list" id="todo"></div>
        </div>
        <div class="col" data-col="doing">
          <h3>Fazendo</h3><div class="drop">solte aqui</div><div class="list" id="doing"></div>
        </div>
        <div class="col" data-col="review">
          <h3>Revisão</h3><div class="drop">solte aqui</div><div class="list" id="review"></div>
        </div>
        <div class="col" data-col="done">
          <h3>Pronto</h3><div class="drop">solte aqui</div><div class="list" id="done"></div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>3) Decisões (o que “tá valendo”)</h2>

      <div class="grid2">
        <div>
          <label>Título</label>
          <input id="dec_title" placeholder="Ex: Encantados finais por bioma" />
        </div>
        <div>
          <label>Detalhes</label>
          <input id="dec_detail" placeholder="O que foi decidido e por quê" />
        </div>
      </div>

      <div class="row">
        <button id="addDecision">Registrar decisão</button>
      </div>

      <div id="decList"></div>
    </section>
  </div>

 
  <script type="module" src="./app.js"></script>
</body>
</html>
