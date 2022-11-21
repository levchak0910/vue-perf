# Vue SSR performance comparison

## Prepare for tests

### Install dependencies

```bash
yarn i
```

### Generate data

```bash
yarn g <data-size?>
```

- data-size = large | l | medium | m | small | s  
- default = large  

data-size:

1. large - 47.5K DOM nodes
2. medium - 20K DOM nodes
3. small - 3.5K DOM nodes

### Build apps

```bash
yarn b
```

## Run tests

### Run performance tests

```bash
yarn p <data-size?>
```

Output: in folder: `store`

### Run clinic

```bash
yarn c <option?>
```

- option = doctor | d | bubbleprof | b | flame | f | heapprofiler | h  
- default = doctor  
