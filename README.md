# Vue SSR performance comparison

## Getting started

### Install dependencies

```bash
yarn install
cd app/nuxt && install
cd app/vite-ssr && install
cd app/fastify && install
cd app/vssrlib && install
```

### Build apps

```bash
yarn b
```

### Run performance tests 

```bash
yarn p
```

### Run clinic doctor 

```bash
yarn c <option?>
```
option = doctor|d | bubbleprof|b | flame|f | heapprofiler|h  
default = doctor  