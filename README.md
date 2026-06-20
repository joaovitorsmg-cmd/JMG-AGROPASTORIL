# Painel do Representante · Agroquima

Painel pessoal de consultoria e vendas agropecuárias — HTML standalone, funciona offline, com assistente Claude integrado.

## Como publicar no GitHub Pages

### 1. Criar repositório PRIVADO

1. Acesse **github.com** → botão verde **"New"**
2. Nome: `painel-jmg` (ou o que preferir)
3. Marque **"Private"** ⚠️ (seus dados de clientes ficam protegidos)
4. Clique **"Create repository"**

---

### 2. Subir os arquivos

No terminal (Git Bash ou CMD com Git instalado):

```bash
# Entre na pasta onde está este README
cd caminho/para/esta/pasta

# Inicialize o repositório
git init
git add .
git commit -m "Painel representante v1"

# Conecte ao GitHub (substitua SEU_USUARIO pelo seu usuário)
git remote add origin https://github.com/SEU_USUARIO/painel-jmg.git
git branch -M main
git push -u origin main
```

---

### 3. Ativar GitHub Pages

1. No repositório GitHub → aba **Settings**
2. Menu lateral → **Pages**
3. Source: **"Deploy from a branch"**
4. Branch: **main** · Pasta: **/ (root)**
5. Clique **Save**

Aguarde ~1 minuto. Seu painel estará em:
```
https://SEU_USUARIO.github.io/painel-jmg/
```

---

### 4. Configurar a API Key (para o Chat Consultor)

1. Abra o painel no celular
2. Toque em **⚙️** (canto superior direito)
3. Cole sua API Key da Anthropic (console.anthropic.com → API Keys)
4. Toque em **Salvar key** → depois **Testar**
5. ✅ Chat ativo!

A key fica salva **só no seu celular** (localStorage). Nunca vai para o GitHub.

---

### 5. Instalar como app no celular

**Android (Chrome):**
- Abra a URL do GitHub Pages no Chrome
- Menu (3 pontinhos) → "Adicionar à tela inicial"
- Confirme → ícone aparece na tela do celular

**iPhone (Safari):**
- Abra a URL no Safari
- Botão de compartilhar (quadrado com seta) → "Adicionar à Tela de Início"
- Confirme → ícone aparece

Após instalar: funciona offline (calculadoras, clientes, aprendizado). Só o chat precisa de sinal.

---

### Atualizar o painel (próximas versões)

```bash
git add .
git commit -m "descrição da atualização"
git push
```

GitHub Pages atualiza automaticamente em ~1 minuto.

---

## Arquivos do repositório

| Arquivo | Função |
|---|---|
| `index.html` | O painel completo (único arquivo principal) |
| `manifest.json` | Configuração do app (ícone, nome, cores) |
| `sw.js` | Service Worker — permite funcionamento offline |
| `icon-192.png` | Ícone do app (tela inicial celular) |
| `icon-512.png` | Ícone do app (alta resolução) |
| `.gitignore` | Protege arquivos sensíveis de subir ao GitHub |

---

## ⚠️ Segurança

- Repositório **PRIVADO** — seus clientes e visitas não ficam expostos
- API Key salva **só no dispositivo** (localStorage) — nunca no código
- Nunca crie um arquivo com a API Key e suba ao GitHub
