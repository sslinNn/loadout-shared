# @loadout/shared

Zod schemas, row mappers, and bundled Supabase config shared by:

- [loadout](https://github.com/sslinNn/loadout) (dashboard)
- [loadout-agent](https://github.com/sslinNn/loadout-agent) (CLI)

```bash
npm i @loadout/shared
# or, until published to the registry:
# "github:sslinNn/loadout-shared#<sha>"
#
# Sibling checkouts (dashboard/agent) use file: in their package.json.
# After pushing this repo, update loadout/loadout-shared.github so Vercel
# can install the same SHA. `dist/` must be current (`npm run build`).
```
