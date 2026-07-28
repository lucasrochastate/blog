# Operação editorial — terminal.faith

Documento de processo para pesquisa de intenção e revisão mensal.

## Assinatura editorial

> fé pensada com calma, sem perder a reverência

Tradução padrão: **ARA** (Almeida Revista e Atualizada).

Cadência: **uma reflexão nova por semana, em média.**

O autor permanece **anônimo** no site público.

## Checklist de publicação (Studio)

Antes de Publish, marque no documento:

1. Título claro e fiel ao texto
2. Resumo revisado
3. Slug estável
4. Capa com alt (ou sem capa de propósito)
5. Referências bíblicas conferidas + tradução
6. Links internos / relacionados pensados
7. Releitura completa

## Pesquisa de intenção (mensal)

Mapear dúvidas reais que o público busca e decidir se merecem texto.

| Intenção (pergunta) | Volume / relevância | Texto existente? | Próxima ação |
|---|---|---|---|
| O que a Bíblia diz sobre medo? | Alta | Sim / Não | Escrever / atualizar / linkar |
| Como orar quando estou ansioso? | | | |
| O que são os Salmos de lamento? | | | |

Fontes sugeridas: autocomplete do Google, buscas sem resultado, feedback espontâneo.

Campo no CMS: **Intenção de busca** (`searchIntent`) em cada post.

## Revisão mensal de produto

Uma vez por mês, 45–60 minutos:

### 5 métricas
1. Leituras engajadas (`engaged_reading` no Vercel Analytics)
2. Visitas à home → abertura de post
3. Posts mais / menos engajados
4. Core Web Vitals (LCP / INP / CLS) no Speed Insights
5. Uma observação qualitativa como autor

### Decisão
Escolher **uma** melhoria para o próximo ciclo. Não abrir frentes demais.

## Webhook de revalidação

1. Gere um secret e coloque em `SANITY_REVALIDATE_SECRET` (Vercel + local).
2. No Sanity → API → Webhooks:
   - URL: `https://SEU_DOMINIO/api/revalidate?secret=SEU_SECRET`
   - Trigger: Create / Update / Delete
   - Filter: `_type == "post"`
3. Publique um post e confirme que a home atualiza sem esperar 60s.
