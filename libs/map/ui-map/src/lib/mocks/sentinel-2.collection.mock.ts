import { TCollection } from '@ukri/map/data-access-stac-catalog';

export const sentinel2CollectionMock: TCollection = {
  type: 'FeatureCollection',
  features: [
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2B_MSIL2A_20240902T201929_N0511_R071_T09WWM_20240902T230811',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-129.0004017731274, 64.92412942212192],
              [-129.00038761705582, 63.93975569013827],
              [-128.17453465812642, 63.93794323040848],
              [-128.08756284513947, 64.0252879445644],
              [-128.0496484033255, 64.05906514415474],
              [-128.01147648443455, 64.0997996117292],
              [-127.8433647708463, 64.25692053964043],
              [-127.75315653376484, 64.34625099763798],
              [-127.40842167794158, 64.66801820912067],
              [-127.13575630811663, 64.91246897251216],
              [-129.0004017731274, 64.92412942212192],
            ],
          ],
        ],
      },
      bbox: [-129.0004017731274, 63.93794323040848, -127.13575630811663, 64.92412942212192],
      properties: {
        datetime: '2024-09-02T20:26:52Z',
        'eo:cloud_cover': 49.73,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2B_MSIL2A_20240902T201929_N0511_R071_T09WWM_20240902T230811',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('f5dc5db4-30d1-4336-9327-9cfa86413d34')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2B_MSIL2A_20240902T201929_N0511_R071_T09WWN_20240902T230811',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-129.00041572310818, 65.82154341270517],
              [-129.00040047797236, 64.83728933346069],
              [-127.23146471387535, 64.82730587940203],
              [-126.64025463927331, 65.35488442403404],
              [-126.59930550558596, 65.80271861053899],
              [-129.00041572310818, 65.82154341270517],
            ],
          ],
        ],
      },
      bbox: [-129.00041572310818, 64.82730587940203, -126.59930550558596, 65.82154341270517],
      properties: {
        datetime: '2024-09-02T20:26:38Z',
        'eo:cloud_cover': 59.89,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2B_MSIL2A_20240902T201929_N0511_R071_T09WWN_20240902T230811',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('9f6a57b1-c60a-4b75-b2ad-54b467d66df6')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2B_MSIL2A_20240902T201929_N0511_R071_T09WXN_20240902T230811',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.8129354922211, 65.80592141579486],
              [-126.8668174426666, 65.15355530836324],
              [-126.12869097420871, 65.79460785088641],
              [-126.8129354922211, 65.80592141579486],
            ],
          ],
        ],
      },
      bbox: [-126.8668174426666, 65.15355530836324, -126.12869097420871, 65.80592141579486],
      properties: {
        datetime: '2024-09-02T20:26:30Z',
        'eo:cloud_cover': 52.86,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2B_MSIL2A_20240902T201929_N0511_R071_T09WXN_20240902T230811',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('57b716b2-56c9-47ae-b7fd-13227c7b916d')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXP_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.3156676724478, 48.72172777523407],
              [-126.31569845620724, 48.72114969510962],
              [-126.24407285844298, 48.70597958449521],
              [-126.14953213811228, 48.683071828609805],
              [-126.1475753750434, 48.71768610108272],
              [-126.3156676724478, 48.72172777523407],
            ],
          ],
        ],
      },
      bbox: [-126.31569845620724, 48.683071828609805, -126.1475753750434, 48.72172777523407],
      properties: {
        datetime: '2024-09-02T19:41:05Z',
        'eo:cloud_cover': 100.0,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXP_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('8a5933ba-49a2-4016-ab07-4b214ef58229')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYP_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.28117163871677, 48.72091838996011],
              [-126.2815367279652, 48.71414824067356],
              [-125.91375455221143, 48.62705394373683],
              [-125.87529419857758, 48.7106174534666],
              [-126.28117163871677, 48.72091838996011],
            ],
          ],
        ],
      },
      bbox: [-126.2815367279652, 48.62705394373683, -125.87529419857758, 48.72091838996011],
      properties: {
        datetime: '2024-09-02T19:41:05Z',
        'eo:cloud_cover': 100.0,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYP_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('ec36fa3f-07b6-46d4-812b-1aca4eac4b61')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWQ_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-129.00026322352653, 49.65271381839439],
              [-129.000260973376, 49.23053326926372],
              [-128.3781397358953, 49.131659128612405],
              [-127.83751347978422, 49.03572166322921],
              [-127.49991011128549, 48.972515984666686],
              [-127.47941847251258, 49.64272825405672],
              [-129.00026322352653, 49.65271381839439],
            ],
          ],
        ],
      },
      bbox: [-129.00026322352653, 48.972515984666686, -127.47941847251258, 49.65271381839439],
      properties: {
        datetime: '2024-09-02T19:41:02Z',
        'eo:cloud_cover': 38.39,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWQ_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('45e9d1f4-87dc-4d5b-9d77-645e0fb931eb')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXQ_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.61481267453512, 49.64442754322305],
              [-127.63284653426342, 48.99737604493451],
              [-126.87843115614263, 48.84663173237632],
              [-126.23976588140768, 48.70497411395211],
              [-126.149532128544, 48.68307199803017],
              [-126.09544159331939, 49.61626508437747],
              [-127.61481267453512, 49.64442754322305],
            ],
          ],
        ],
      },
      bbox: [-127.63284653426342, 48.68307199803017, -126.09544159331939, 49.64442754322305],
      properties: {
        datetime: '2024-09-02T19:41:00Z',
        'eo:cloud_cover': 84.68,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXQ_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('6d80ad8f-9a62-46e3-af25-164776f1118f')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYQ_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.23147187331796, 49.61960079750054],
              [-126.28152702784485, 48.71432815067108],
              [-125.91345117461216, 48.626982542721215],
              [-125.63493072482784, 49.225516621369096],
              [-125.51581885611931, 49.48145798742874],
              [-125.4582957480597, 49.59850622176515],
              [-126.23147187331796, 49.61960079750054],
            ],
          ],
        ],
      },
      bbox: [-126.28152702784485, 48.626982542721215, -125.4582957480597, 49.61960079750054],
      properties: {
        datetime: '2024-09-02T19:40:57Z',
        'eo:cloud_cover': 96.95,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYQ_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('6fc33211-d6f3-45a2-9436-9bbeb7aa61a5')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCV_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.76905360196342, 49.61958822027285],
              [-125.73509591468044, 49.010557925784056],
              [-125.51570844420344, 49.48165477822756],
              [-125.44496833040758, 49.62689116627953],
              [-125.76905360196342, 49.61958822027285],
            ],
          ],
        ],
      },
      bbox: [-125.76905360196342, 49.010557925784056, -125.44496833040758, 49.62689116627953],
      properties: {
        datetime: '2024-09-02T19:40:52Z',
        'eo:cloud_cover': 82.51,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCV_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('978df571-a586-4cab-9ad5-19bc3d30b579')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWR_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-129.00026819968144, 50.552283115896145],
              [-129.0002627503862, 49.56476399322528],
              [-127.48215041503963, 49.55480922864334],
              [-127.45068625539953, 50.54197601432122],
              [-129.00026819968144, 50.552283115896145],
            ],
          ],
        ],
      },
      bbox: [-129.00026819968144, 49.55480922864334, -127.45068625539953, 50.552283115896145],
      properties: {
        datetime: '2024-09-02T19:40:51Z',
        'eo:cloud_cover': 39.57,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWR_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('9abab36c-6105-4fbb-901c-a8dba36335c5')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXR_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.58863665342723, 50.54373001121632],
              [-127.61730156032554, 49.556503277358885],
              [-126.1006535770307, 49.52842762216049],
              [-126.04062856692687, 50.51466139137412],
              [-127.58863665342723, 50.54373001121632],
            ],
          ],
        ],
      },
      bbox: [-127.61730156032554, 49.52842762216049, -126.04062856692687, 50.54373001121632],
      properties: {
        datetime: '2024-09-02T19:40:47Z',
        'eo:cloud_cover': 32.89,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXR_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('20a29f7d-77a0-420e-859a-87e113bd2b8d')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYR_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.17921749908633, 50.51810437792452],
              [-126.23638984689104, 49.53265150062208],
              [-125.49884763003737, 49.51320315222627],
              [-125.42277255576306, 49.67575230242344],
              [-125.37354451067765, 49.772602696024165],
              [-125.06305974420782, 50.40234367874509],
              [-125.04555929587384, 50.44068743949302],
              [-125.0221389045879, 50.484278067246656],
              [-126.17921749908633, 50.51810437792452],
            ],
          ],
        ],
      },
      bbox: [-126.23638984689104, 49.51320315222627, -125.0221389045879, 50.51810437792452],
      properties: {
        datetime: '2024-09-02T19:40:43Z',
        'eo:cloud_cover': 92.56,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYR_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('a9bcd58c-4bbe-4155-9525-98e76c247a6d')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCA_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.82131786245534, 50.51809139619609],
              [-125.76413469896866, 49.53263898167039],
              [-125.48589314759256, 49.53949185497803],
              [-125.42309974442287, 49.6751592575847],
              [-125.35144592340376, 49.81618599228643],
              [-125.04563969444108, 50.44054357964675],
              [-124.99656329072988, 50.535164471930095],
              [-125.82131786245534, 50.51809139619609],
            ],
          ],
        ],
      },
      bbox: [-125.82131786245534, 49.53263898167039, -124.99656329072988, 50.535164471930095],
      properties: {
        datetime: '2024-09-02T19:40:41Z',
        'eo:cloud_cover': 94.21,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCA_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('5832686c-f529-4c6e-8294-a15690b9ee58')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWS_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-128.95475288818326, 51.45116448246815],
              [-129.00027277979342, 51.34149462914399],
              [-129.00026769896505, 50.463807393553765],
              [-127.45357734662694, 50.45353245457087],
              [-127.4204706710323, 51.440532369647954],
              [-128.95475288818326, 51.45116448246815],
            ],
          ],
        ],
      },
      bbox: [-129.00027277979342, 50.45353245457087, -127.4204706710323, 51.45116448246815],
      properties: {
        datetime: '2024-09-02T19:40:36Z',
        'eo:cloud_cover': 60.06,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWS_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('efc29370-803d-482d-9d38-dae45732501a')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXS_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.56110910425159, 51.442343149722554],
              [-127.59127054069994, 50.45528097922566],
              [-126.04614378277391, 50.42630299759804],
              [-125.98298993678317, 51.412334043893864],
              [-127.56110910425159, 51.442343149722554],
            ],
          ],
        ],
      },
      bbox: [-127.59127054069994, 50.42630299759804, -125.98298993678317, 51.442343149722554],
      properties: {
        datetime: '2024-09-02T19:40:33Z',
        'eo:cloud_cover': 56.59,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXS_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('06555e4e-1d86-417c-87df-63a8df723983')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYS_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.12426890957983, 51.4158883615581],
              [-126.1844752878895, 50.42973525443098],
              [-125.06475044341575, 50.39721251652314],
              [-124.9514094573792, 50.63538958835479],
              [-124.80606579350493, 50.91303265095634],
              [-124.79963457070566, 50.93093667668647],
              [-124.7405939248939, 51.05308864101479],
              [-124.62178837777671, 51.288316972561006],
              [-125.03488463114705, 51.38405750200006],
              [-126.12426890957983, 51.4158883615581],
            ],
          ],
        ],
      },
      bbox: [-126.1844752878895, 50.39721251652314, -124.62178837777671, 51.4158883615581],
      properties: {
        datetime: '2024-09-02T19:40:29Z',
        'eo:cloud_cover': 63.41,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYS_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('af63c65e-8fb3-41ea-9c01-225db7b61e54')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCB_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.87627684603153, 51.41587496002549],
              [-125.81611240122396, 50.43062057462144],
              [-125.04138986687794, 50.447338686047566],
              [-124.94983964185714, 50.63825705705453],
              [-124.80620924533078, 50.913596410304116],
              [-124.79916177387258, 50.93195128949345],
              [-124.74022634314487, 51.053834759567415],
              [-124.6217240010048, 51.288396805941794],
              [-125.02195120290754, 51.380724518846165],
              [-125.24524437725806, 51.429669011182085],
              [-125.87627684603153, 51.41587496002549],
            ],
          ],
        ],
      },
      bbox: [-125.87627684603153, 50.43062057462144, -124.6217240010048, 51.429669011182085],
      properties: {
        datetime: '2024-09-02T19:40:28Z',
        'eo:cloud_cover': 67.54,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCB_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('fd87be0e-d346-4f69-9e56-03d8a8b2dc0b')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWT_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.40645967390539, 51.84191757627496],
              [-127.99942181258291, 51.93306949039125],
              [-128.71235356165116, 52.030367697513405],
              [-128.99102919224558, 51.36325035512053],
              [-127.42349538209312, 51.35264307342674],
              [-127.40645967390539, 51.84191757627496],
            ],
          ],
        ],
      },
      bbox: [-128.99102919224558, 51.35264307342674, -127.40645967390539, 52.030367697513405],
      properties: {
        datetime: '2024-09-02T19:40:25Z',
        'eo:cloud_cover': 42.01,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWT_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('a128cebc-3349-495f-abe1-a651125517df')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXT_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.97164902511547, 51.58362842190189],
              [-126.7178838035248, 51.72487162163321],
              [-127.54770240896781, 51.86370151994597],
              [-127.56386473742128, 51.3544482017922],
              [-125.98875961529652, 51.32453270142056],
              [-125.97164902511547, 51.58362842190189],
            ],
          ],
        ],
      },
      bbox: [-127.56386473742128, 51.32453270142056, -125.97164902511547, 51.86370151994597],
      properties: {
        datetime: '2024-09-02T19:40:23Z',
        'eo:cloud_cover': 25.19,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXT_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('02a4d3c6-cb35-4017-8683-586daf932f12')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYT_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.6248524275201, 51.28145981002],
              [-124.6217202686469, 51.28829716426668],
              [-125.09007473451685, 51.39551045618075],
              [-125.28030377009632, 51.436774914348085],
              [-125.44874186262709, 51.475218040489416],
              [-126.11194171944383, 51.6110830919723],
              [-126.1297693364304, 51.32807593870021],
              [-124.6248524275201, 51.28145981002],
            ],
          ],
        ],
      },
      bbox: [-126.1297693364304, 51.28145981002, -124.6217202686469, 51.6110830919723],
      properties: {
        datetime: '2024-09-02T19:40:22Z',
        'eo:cloud_cover': 34.22,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYT_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('666f40a3-9776-45a0-b787-3cb445aa1e47')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYS_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.02977336002296, 51.41352994738434],
              [-125.68283231982035, 51.34465097773675],
              [-125.01799393028445, 51.19920792820294],
              [-124.70429066978265, 51.12401366058706],
              [-124.62743242904887, 51.27763711625419],
              [-124.57927021022682, 51.367725646296726],
              [-126.02977336002296, 51.41352994738434],
            ],
          ],
        ],
      },
      bbox: [-126.02977336002296, 51.12401366058706, -124.57927021022682, 51.41352994738434],
      properties: {
        datetime: '2024-09-02T19:40:21Z',
        'eo:cloud_cover': 39.5,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYS_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('4443c5ad-622e-47a0-93d7-fd6491fa3f63')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCB_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.87627684603153, 51.41587496002549],
              [-125.87411722408046, 51.3814569442921],
              [-125.6983334456652, 51.348119746071504],
              [-125.04481217334313, 51.20540279997803],
              [-124.70464230869015, 51.124058454736634],
              [-124.62723286103333, 51.277958226127794],
              [-124.5411065338903, 51.44104384305529],
              [-125.87627684603153, 51.41587496002549],
            ],
          ],
        ],
      },
      bbox: [-125.87627684603153, 51.124058454736634, -124.5411065338903, 51.44104384305529],
      properties: {
        datetime: '2024-09-02T19:40:21Z',
        'eo:cloud_cover': 42.83,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCB_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('887436b4-d3a0-4eb0-956a-6c4df0f3a524')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCC_20240903T020644',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.87083150256731, 51.328960656632134],
              [-124.88123452229134, 51.34957951440516],
              [-125.76167649049977, 51.54012484471878],
              [-125.88566534721515, 51.56470887120162],
              [-125.87083150256731, 51.328960656632134],
            ],
          ],
        ],
      },
      bbox: [-125.88566534721515, 51.328960656632134, -124.88123452229134, 51.56470887120162],
      properties: {
        datetime: '2024-09-02T19:40:21Z',
        'eo:cloud_cover': 39.25,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCC_20240903T020644',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('d5e2b5ca-a7a4-494e-a063-46ba92b47845')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWT_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-128.5759471905131, 52.34970331696299],
              [-128.7815079767251, 51.864276394761035],
              [-128.08086779461848, 51.76947427117881],
              [-127.41268133134504, 51.66483279241542],
              [-127.38863063594047, 52.33947606379815],
              [-128.5759471905131, 52.34970331696299],
            ],
          ],
        ],
      },
      bbox: [-128.7815079767251, 51.66483279241542, -127.38863063594047, 52.34970331696299],
      properties: {
        datetime: '2024-09-02T19:40:18Z',
        'eo:cloud_cover': 76.21,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWT_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('77de29d0-4e98-4624-86c6-29a263762cb5')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXT_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.53210147111713, 52.34134592585369],
              [-127.55336854973288, 51.686875759423444],
              [-127.39821222851106, 51.66341674719481],
              [-126.69834543491633, 51.54278043718497],
              [-126.37464925457142, 51.483093895110535],
              [-126.11422769943334, 51.43217421921585],
              [-125.98353007511061, 51.40413323520969],
              [-125.92225733864029, 52.31035831772107],
              [-127.53210147111713, 52.34134592585369],
            ],
          ],
        ],
      },
      bbox: [-127.55336854973288, 51.40413323520969, -125.92225733864029, 52.34134592585369],
      properties: {
        datetime: '2024-09-02T19:40:16Z',
        'eo:cloud_cover': 66.05,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXT_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('b6fc61d5-86bd-41f7-b3bc-921062d3e1b3')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYT_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.06637017371585, 52.31402846026593],
              [-126.12320531130155, 51.43281707118003],
              [-126.06102835671498, 51.42112272133443],
              [-126.047021955004, 51.41662101179338],
              [-125.69471137909842, 51.34714490218364],
              [-125.54197270425095, 51.31317000413287],
              [-124.62439764622576, 51.2823427255494],
              [-124.54275419316241, 51.43514116394913],
              [-124.46003574563366, 52.26312899443714],
              [-126.06637017371585, 52.31402846026593],
            ],
          ],
        ],
      },
      bbox: [-126.12320531130155, 51.2823427255494, -124.46003574563366, 52.31402846026593],
      properties: {
        datetime: '2024-09-02T19:40:14Z',
        'eo:cloud_cover': 60.81,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYT_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('f37c0109-5435-4d24-921c-2ee3d3358849')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCC_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.93418653184088, 52.314014621980924],
              [-125.87408907235975, 51.38100783663391],
              [-125.71544987082972, 51.350962022605295],
              [-125.64177088628055, 51.33515002550108],
              [-125.64172901414926, 51.334445079056714],
              [-124.58620084795808, 51.35341158576051],
              [-124.4518508481913, 51.61767861742776],
              [-124.43566910284628, 51.64428733890103],
              [-124.31054681623993, 51.88362559202183],
              [-124.32408985619966, 52.343045230813516],
              [-125.93418653184088, 52.314014621980924],
            ],
          ],
        ],
      },
      bbox: [-125.93418653184088, 51.334445079056714, -124.31054681623993, 52.343045230813516],
      properties: {
        datetime: '2024-09-02T19:40:13Z',
        'eo:cloud_cover': 63.51,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCC_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('82186605-e8de-4b45-8887-2388c79b1ab2')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWU_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-128.18317792707882, 53.2468192780339],
              [-128.20397315726603, 53.19693963915034],
              [-128.22434011578864, 53.15524685214216],
              [-128.23208195176414, 53.13116574881534],
              [-128.26835700077933, 53.05638963477463],
              [-128.28947993215604, 53.00439796876939],
              [-128.61370069144624, 52.26192325546245],
              [-127.3918173295053, 52.2516016292841],
              [-127.35506865716899, 53.238267793866605],
              [-128.18317792707882, 53.2468192780339],
            ],
          ],
        ],
      },
      bbox: [-128.61370069144624, 52.2516016292841, -127.35506865716899, 53.2468192780339],
      properties: {
        datetime: '2024-09-02T19:40:07Z',
        'eo:cloud_cover': 95.19,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWU_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('e0e27938-48ee-44c9-94a4-f6fbac790603')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UDC_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.46845612600114, 52.34133899616034],
              [-124.44530588428553, 51.62797235289585],
              [-124.06411869898379, 52.34567270672514],
              [-124.46845612600114, 52.34133899616034],
            ],
          ],
        ],
      },
      bbox: [-124.46845612600114, 51.62797235289585, -124.06411869898379, 52.34567270672514],
      properties: {
        datetime: '2024-09-02T19:40:05Z',
        'eo:cloud_cover': 99.44,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UDC_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('e76b5e28-a435-4fae-ba38-cd7d08e93d97')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXU_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.50152490659785, 53.24019917353021],
              [-127.53500469208372, 52.25346561091421],
              [-125.9283355049499, 52.22257539033494],
              [-125.85824569567477, 53.20819278990224],
              [-127.50152490659785, 53.24019917353021],
            ],
          ],
        ],
      },
      bbox: [-127.53500469208372, 52.22257539033494, -125.85824569567477, 53.24019917353021],
      properties: {
        datetime: '2024-09-02T19:40:04Z',
        'eo:cloud_cover': 72.0,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXU_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('52fa4815-f3c2-471c-8bf2-ba68d489c663')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYU_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.00534474456427, 53.21198351721884],
              [-126.07216475181392, 52.22623400545979],
              [-124.46898139929701, 52.17549423884302],
              [-124.3658327414391, 53.159413584762824],
              [-126.00534474456427, 53.21198351721884],
            ],
          ],
        ],
      },
      bbox: [-126.07216475181392, 52.17549423884302, -124.3658327414391, 53.21198351721884],
      properties: {
        datetime: '2024-09-02T19:40:00Z',
        'eo:cloud_cover': 72.19,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYU_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('cf6d79db-c62b-4c5d-8131-a1d75ff8d1d5')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCD_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.99522349980253, 53.2119692242292],
              [-125.92839085796024, 52.226220210642516],
              [-124.32147084818757, 52.25515957139588],
              [-124.35167318285072, 53.24195438957527],
              [-125.99522349980253, 53.2119692242292],
            ],
          ],
        ],
      },
      bbox: [-125.99522349980253, 52.226220210642516, -124.32147084818757, 53.24195438957527],
      properties: {
        datetime: '2024-09-02T19:39:59Z',
        'eo:cloud_cover': 72.08,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCD_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('d3fab911-329b-47bb-9cf9-e611d45d7dbb')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UDD_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.49904429486655, 53.24019201584304],
              [-124.46558143109195, 52.2543574904385],
              [-124.11054986368924, 52.258768127129564],
              [-123.56931401370755, 53.24825817334199],
              [-124.49904429486655, 53.24019201584304],
            ],
          ],
        ],
      },
      bbox: [-124.49904429486655, 52.2543574904385, -123.56931401370755, 53.24825817334199],
      properties: {
        datetime: '2024-09-02T19:39:54Z',
        'eo:cloud_cover': 86.84,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UDD_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('0d2e849a-9d91-41b2-a320-956c71128673')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWV_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.77959067148873, 54.141909964206086],
              [-127.79124185448643, 54.11234219722616],
              [-127.83798788798155, 54.016315059996835],
              [-127.89134022740186, 53.89236641780849],
              [-128.12172353594957, 53.38315648702816],
              [-128.1691991080134, 53.28356724763839],
              [-128.1861367483184, 53.237115914136],
              [-128.20398260461593, 53.19691902065979],
              [-128.22489507515374, 53.158660552158146],
              [-127.35844964747143, 53.14986907968924],
              [-127.31967979447761, 54.13636865682257],
              [-127.77959067148873, 54.141909964206086],
            ],
          ],
        ],
      },
      bbox: [-128.22489507515374, 53.14986907968924, -127.31967979447761, 54.141909964206086],
      properties: {
        datetime: '2024-09-02T19:39:53Z',
        'eo:cloud_cover': 52.98,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWV_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('0ab1f5e8-dbac-4e77-860b-156a16e88238')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXV_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.46928377403091, 54.13836413755981],
              [-127.50460515799924, 53.151794295337545],
              [-125.86469388962972, 53.11988998914645],
              [-125.79075587014665, 54.1052962674021],
              [-127.46928377403091, 54.13836413755981],
            ],
          ],
        ],
      },
      bbox: [-127.50460515799924, 53.11988998914645, -125.79075587014665, 54.13836413755981],
      properties: {
        datetime: '2024-09-02T19:39:49Z',
        'eo:cloud_cover': 53.93,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXV_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('f4e777eb-ab6c-45ac-96ac-bbf309115c03')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UYV_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-125.94100265310139, 54.10921262676949],
              [-126.01149215389292, 53.123668634665954],
              [-124.37532164400066, 53.071266063824744],
              [-124.26652573554264, 54.054902500953084],
              [-125.94100265310139, 54.10921262676949],
            ],
          ],
        ],
      },
      bbox: [-126.01149215389292, 53.071266063824744, -124.26652573554264, 54.10921262676949],
      properties: {
        datetime: '2024-09-02T19:39:46Z',
        'eo:cloud_cover': 77.45,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UYV_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('a66aae73-6a48-44bb-9afe-b0e25a433968')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCE_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.05957775440241, 54.1091978600387],
              [-125.9890749282254, 53.12365438723488],
              [-124.34889446067784, 53.153543909115854],
              [-124.38075828311565, 54.140177613198425],
              [-126.05957775440241, 54.1091978600387],
            ],
          ],
        ],
      },
      bbox: [-126.05957775440241, 53.12365438723488, -124.34889446067784, 54.140177613198425],
      properties: {
        datetime: '2024-09-02T19:39:45Z',
        'eo:cloud_cover': 79.82,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCE_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('b3d4b150-ad2d-48a7-b3a2-d90f0d5df4b5')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UDE_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.53129766280959, 54.13835674230307],
              [-124.49599411485077, 53.15268578336115],
              [-123.6170897318795, 53.16102161371523],
              [-123.0570619338809, 54.14808159478917],
              [-124.53129766280959, 54.13835674230307],
            ],
          ],
        ],
      },
      bbox: [-124.53129766280959, 53.15268578336115, -123.0570619338809, 54.14808159478917],
      properties: {
        datetime: '2024-09-02T19:39:40Z',
        'eo:cloud_cover': 76.05,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UDE_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('2cf7a87d-7b56-46d1-99ae-2a9460884151')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UWA_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.36666650148132, 55.036018767409644],
              [-127.45066258152156, 54.8483535662459],
              [-127.69141963694864, 54.32844376561098],
              [-127.76882677411879, 54.168543259400344],
              [-127.79091587329167, 54.113056159929606],
              [-127.81970891980217, 54.05442174908519],
              [-127.32322677690968, 54.04852390159315],
              [-127.28228179668255, 55.03485695373209],
              [-127.36666650148132, 55.036018767409644],
            ],
          ],
        ],
      },
      bbox: [-127.81970891980217, 54.04852390159315, -127.28228179668255, 55.036018767409644],
      properties: {
        datetime: '2024-09-02T19:39:39Z',
        'eo:cloud_cover': 49.76,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UWA_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('fb140d56-fbcb-43f4-b0ed-997ac51db722')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXA_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-127.36666549592097, 55.03601875391395],
              [-127.44166848421803, 54.87042859807485],
              [-127.47251527221401, 54.050512990826135],
              [-125.79752000339369, 54.01755095784914],
              [-125.71944147096798, 55.00274265966371],
              [-127.36666549592097, 55.03601875391395],
            ],
          ],
        ],
      },
      bbox: [-127.47251527221401, 54.01755095784914, -125.71944147096798, 55.03601875391395],
      properties: {
        datetime: '2024-09-02T19:39:35Z',
        'eo:cloud_cover': 63.16,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXA_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('30a51d26-07ca-4efa-bd90-a7fbb3be496f')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCF_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.127579734269, 55.00677498868905],
              [-126.05312784753416, 54.02144007175762],
              [-124.37784310377, 54.05232065739022],
              [-124.41149500649642, 55.03879374309367],
              [-126.127579734269, 55.00677498868905],
            ],
          ],
        ],
      },
      bbox: [-126.127579734269, 54.02144007175762, -124.37784310377, 55.03879374309367],
      properties: {
        datetime: '2024-09-02T19:39:31Z',
        'eo:cloud_cover': 81.43,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCF_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('16e2a7c1-aac7-447a-a458-cfe74c96293a')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UDF_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.56538236947809, 55.03691175858469],
              [-124.52809791254305, 54.051404089412365],
              [-123.10712407161785, 54.06160261529498],
              [-122.84930187906637, 54.501835548713736],
              [-122.84726241136241, 55.046881237770755],
              [-124.56538236947809, 55.03691175858469],
            ],
          ],
        ],
      },
      bbox: [-124.56538236947809, 54.051404089412365, -122.84726241136241, 55.046881237770755],
      properties: {
        datetime: '2024-09-02T19:39:26Z',
        'eo:cloud_cover': 90.52,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UDF_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('4d9cb413-164f-4a0d-ad4c-eb2538c6da28')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09UXB_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.92913379212497, 55.92832002304304],
              [-127.09596716903295, 55.593828565293244],
              [-127.27959315575315, 55.20734769270906],
              [-127.36432735581353, 55.03960926152477],
              [-127.3888645070283, 54.984153145149655],
              [-127.40734994287884, 54.9486770548681],
              [-125.72658810617749, 54.915016617175084],
              [-125.6440484400166, 55.899990056205354],
              [-126.92913379212497, 55.92832002304304],
            ],
          ],
        ],
      },
      bbox: [-127.40734994287884, 54.915016617175084, -125.6440484400166, 55.92832002304304],
      properties: {
        datetime: '2024-09-02T19:39:20Z',
        'eo:cloud_cover': 59.78,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09UXB_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('cad43a9d-08aa-4d92-94b7-8bd20be1ac0b')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UEF_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-123.00029736857596, 55.04697704404184],
              [-123.00029158162297, 54.24638781192365],
              [-122.52417354585732, 55.04604720550552],
              [-123.00029736857596, 55.04697704404184],
            ],
          ],
        ],
      },
      bbox: [-123.00029736857596, 54.24638781192365, -122.52417354585732, 55.04697704404184],
      properties: {
        datetime: '2024-09-02T19:39:19Z',
        'eo:cloud_cover': 98.89,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UEF_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('1476fc8d-d852-4274-b20b-d719ae823109')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UCG_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.19947186164417, 55.90415906747963],
              [-126.12076500729364, 54.91903591059477],
              [-124.40841462513497, 54.95095106308822],
              [-124.44399351980796, 55.937264174319125],
              [-126.19947186164417, 55.90415906747963],
            ],
          ],
        ],
      },
      bbox: [-126.19947186164417, 54.91903591059477, -124.40841462513497, 55.937264174319125],
      properties: {
        datetime: '2024-09-02T19:39:17Z',
        'eo:cloud_cover': 66.01,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UCG_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('9dfc405d-517c-4f0e-b9bb-e01be65b8b67')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UDG_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.6014205428421, 55.935318286214844],
              [-124.5619664682755, 54.94907517259897],
              [-122.84759587169036, 54.95901236331842],
              [-122.84374429829509, 55.94562635516122],
              [-124.6014205428421, 55.935318286214844],
            ],
          ],
        ],
      },
      bbox: [-124.6014205428421, 54.94907517259897, -122.84374429829509, 55.94562635516122],
      properties: {
        datetime: '2024-09-02T19:39:12Z',
        'eo:cloud_cover': 68.79,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UDG_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('20e4c2cf-b4a0-4754-b9d1-91232e1f0663')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10UEG_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-123.00030421811057, 55.94572541612442],
              [-123.00029672597259, 54.96000651421812],
              [-122.57593883086558, 54.95944632101089],
              [-122.30299377994828, 55.4153380928962],
              [-121.97034929946894, 55.94142363778331],
              [-123.00030421811057, 55.94572541612442],
            ],
          ],
        ],
      },
      bbox: [-123.00030421811057, 54.95944632101089, -121.97034929946894, 55.94572541612442],
      properties: {
        datetime: '2024-09-02T19:39:07Z',
        'eo:cloud_cover': 65.63,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10UEG_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('ded74146-894d-4a1e-aaf0-f9e794b29d56')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T09VXC_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.48271947741047, 56.81841901751644],
              [-126.77189574762684, 56.24226564902267],
              [-126.92292496751747, 55.93842760658901],
              [-126.97371645547612, 55.840645588332],
              [-125.65165385933275, 55.81174543460175],
              [-125.56430079893471, 56.79649663295673],
              [-126.48271947741047, 56.81841901751644],
            ],
          ],
        ],
      },
      bbox: [-126.97371645547612, 55.81174543460175, -125.56430079893471, 56.81841901751644],
      properties: {
        datetime: '2024-09-02T19:39:06Z',
        'eo:cloud_cover': 32.63,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T09VXC_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('56c7199c-6bcb-4103-88e0-e9f0f7e78bd9')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10VCH_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-126.27551749018637, 56.80080867292807],
              [-126.19221955741736, 55.815900724770465],
              [-124.44071498501195, 55.84889677146691],
              [-124.47837355660614, 56.835050684413964],
              [-126.27551749018637, 56.80080867292807],
            ],
          ],
        ],
      },
      bbox: [-126.27551749018637, 55.815900724770465, -124.44071498501195, 56.835050684413964],
      properties: {
        datetime: '2024-09-02T19:39:03Z',
        'eo:cloud_cover': 39.46,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10VCH_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('4daf3a7a-fa4e-4358-9a78-3ebf2a237061')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
    {
      stac_version: '1.0.0',
      stac_extensions: [
        'https://stac-extensions.github.io/eo/v1.0.0/schema.json',
        'https://stac-extensions.github.io/projection/v1.0.0/schema.json',
      ],
      id: 'S2A_MSIL2A_20240902T192911_N0511_R142_T10VDH_20240903T023454',
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-124.63954491274227, 56.833037913591376],
              [-124.59778492856172, 55.84695729894294],
              [-122.84409921919038, 55.857231374959795],
              [-122.8400223934083, 56.84370036476934],
              [-124.63954491274227, 56.833037913591376],
            ],
          ],
        ],
      },
      bbox: [-124.63954491274227, 55.84695729894294, -122.8400223934083, 56.84370036476934],
      properties: {
        datetime: '2024-09-02T19:38:58Z',
        'eo:cloud_cover': 38.15,
      },
      assets: {},
      collection: 'sentinel-2-l2a',
      links: [
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a/items/S2A_MSIL2A_20240902T192911_N0511_R142_T10VDH_20240903T023454',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/collections/sentinel-2-l2a',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: "https://scihub.copernicus.eu/dhus/odata/v1/Products('5f262cfc-61ba-43b7-821a-df0241f44499')/$value",
          rel: 'derived_from',
          title: 'scihub download',
        },
      ],
    },
  ],
  links: [
    {
      href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/search',
      rel: 'self',
      type: 'application/geo+json',
    },
    {
      href: 'https://services.sentinel-hub.com/api/v1/catalog/1.0.0/search',
      rel: 'next',
      type: 'application/geo+json',
      title: 'Next set of results',
      method: 'POST',
      body: {
        next: 50,
      },
      merge: true,
    },
  ],
  context: {
    next: 50,
    limit: 50,
    returned: 50,
  },
} as TCollection;
