# Sentinel 1

# Sentinel 2

## L1C

```json
{
  "collections": ["sentinel-2-l1c"]
}
```

## L2A

```json
{
  "collections": ["sentinel-2-l2a"],
  "fields": {
    "include": ["properties.eo:cloud_cover"]
  }
}
```

```json
{
  "collections": ["sentinel-2-l2a"],
  "limit": 10,
  "fields": {
    "include": ["properties.eo:cloud_cover"]
  },
  "filter-lang": "cql2-json",
  "filter": {
    "op": "and",
    "args": [
      {
        "op": "<=",
        "args": [
          {
            "property": "properties.eo:cloud_cover"
          },
          100
        ]
      }
    ]
  }
}
```
