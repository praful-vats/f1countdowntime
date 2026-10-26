// Verified schedule and unmodified circuit outlines from Formula1.com.
// Regenerate with: node scripts/sync-official.mjs
export const scheduleMeta = {
  "season": 2026,
  "checkedAt": "2026-10-26T10:43:49.714Z",
  "sourceUrl": "https://www.formula1.com/en/racing/2026",
  "totalRounds": 23,
  "updateMode": "verified-snapshot"
};

export const races = [
  {
    "id": "australia",
    "round": 1,
    "title": "Australian",
    "officialName": "FORMULA 1 QATAR AIRWAYS AUSTRALIAN GRAND PRIX 2026",
    "country": "Australia",
    "location": "Melbourne",
    "circuit": "Albert Park Grand Prix Circuit",
    "flag": "AU",
    "date": "2026-03-08T04:00:00.000Z",
    "dateStart": "2026-03-06",
    "dateEnd": "2026-03-08",
    "timezone": "Australia/Melbourne",
    "sprint": false,
    "lengthKm": "5.278",
    "laps": 58,
    "distanceKm": "306.124",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-03-06T01:30:00.000Z",
        "end": "2026-03-06T02:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11227
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-03-06T05:00:00.000Z",
        "end": "2026-03-06T06:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11228
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-03-07T01:30:00.000Z",
        "end": "2026-03-07T02:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11229
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-03-07T05:00:00.000Z",
        "end": "2026-03-07T06:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11230
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-03-08T04:00:00.000Z",
        "end": "2026-03-08T06:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11234
      }
    ],
    "trackAsset": "./tracks/australia.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmelbourneblackoutline.svg",
    "trackSha256": "935b2de528136cecbff4d9be2b8497afe072e46e466d445f55c11077671c2acd",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/australia"
  },
  {
    "id": "china",
    "round": 2,
    "title": "Chinese",
    "officialName": "FORMULA 1 HEINEKEN CHINESE GRAND PRIX 2026",
    "country": "China",
    "location": "Shanghai",
    "circuit": "Shanghai International Circuit",
    "flag": "CN",
    "date": "2026-03-15T07:00:00.000Z",
    "dateStart": "2026-03-13",
    "dateEnd": "2026-03-15",
    "timezone": "Asia/Shanghai",
    "sprint": true,
    "lengthKm": "5.451",
    "laps": 56,
    "distanceKm": "305.066",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-03-13T03:30:00.000Z",
        "end": "2026-03-13T04:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11235
      },
      {
        "id": "sq",
        "name": "Sprint Qualifying",
        "start": "2026-03-13T07:30:00.000Z",
        "end": "2026-03-13T08:14:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11236
      },
      {
        "id": "sprint",
        "name": "Sprint",
        "start": "2026-03-14T03:00:00.000Z",
        "end": "2026-03-14T04:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11240
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-03-14T07:00:00.000Z",
        "end": "2026-03-14T08:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11241
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-03-15T07:00:00.000Z",
        "end": "2026-03-15T09:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11245
      }
    ],
    "trackAsset": "./tracks/china.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackshanghaiblackoutline.svg",
    "trackSha256": "ac11f73a5499cb566457a7d46c668af40aa9b6c7c72e5728b04d9e7dcfbefaee",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/china"
  },
  {
    "id": "japan",
    "round": 3,
    "title": "Japanese",
    "officialName": "FORMULA 1 ARAMCO JAPANESE GRAND PRIX 2026",
    "country": "Japan",
    "location": "Suzuka",
    "circuit": "Suzuka Circuit",
    "flag": "JP",
    "date": "2026-03-29T05:00:00.000Z",
    "dateStart": "2026-03-27",
    "dateEnd": "2026-03-29",
    "timezone": "Asia/Tokyo",
    "sprint": false,
    "lengthKm": "5.807",
    "laps": 53,
    "distanceKm": "307.471",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-03-27T02:30:00.000Z",
        "end": "2026-03-27T03:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11246
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-03-27T06:00:00.000Z",
        "end": "2026-03-27T07:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11247
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-03-28T02:30:00.000Z",
        "end": "2026-03-28T03:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11248
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-03-28T06:00:00.000Z",
        "end": "2026-03-28T07:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11249
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-03-29T05:00:00.000Z",
        "end": "2026-03-29T07:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11253
      }
    ],
    "trackAsset": "./tracks/japan.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026tracksuzukablackoutline.svg",
    "trackSha256": "cf699d42f3098789de46c7c7d42545b62d00f5422f90114c0e2a275ee28a6021",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/japan"
  },
  {
    "id": "miami",
    "round": 4,
    "title": "Miami",
    "officialName": "FORMULA 1 CRYPTO.COM MIAMI GRAND PRIX 2026",
    "country": "United States",
    "location": "Miami Gardens",
    "circuit": "Miami International Autodrome",
    "flag": "US",
    "date": "2026-05-03T17:00:00.000Z",
    "dateStart": "2026-05-01",
    "dateEnd": "2026-05-03",
    "timezone": "America/New_York",
    "sprint": true,
    "lengthKm": "5.412",
    "laps": 57,
    "distanceKm": "308.326",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-05-01T16:00:00.000Z",
        "end": "2026-05-01T17:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11270
      },
      {
        "id": "sq",
        "name": "Sprint Qualifying",
        "start": "2026-05-01T20:30:00.000Z",
        "end": "2026-05-01T21:14:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11271
      },
      {
        "id": "sprint",
        "name": "Sprint",
        "start": "2026-05-02T16:00:00.000Z",
        "end": "2026-05-02T17:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11275
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-05-02T20:00:00.000Z",
        "end": "2026-05-02T21:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11276
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-05-03T17:00:00.000Z",
        "end": "2026-05-03T19:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11280
      }
    ],
    "trackAsset": "./tracks/miami.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmiamiblackoutline.svg",
    "trackSha256": "6b036f75f5b86b6ce17bb1e3d58b6cac8e150042a456c67bb8582202449cd8dd",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/miami"
  },
  {
    "id": "canada",
    "round": 5,
    "title": "Canadian",
    "officialName": "FORMULA 1 LENOVO GRAND PRIX DU CANADA 2026",
    "country": "Canada",
    "location": "Montréal",
    "circuit": "Circuit Gilles-Villeneuve",
    "flag": "CA",
    "date": "2026-05-24T20:00:00.000Z",
    "dateStart": "2026-05-22",
    "dateEnd": "2026-05-24",
    "timezone": "America/Toronto",
    "sprint": true,
    "lengthKm": "4.361",
    "laps": 70,
    "distanceKm": "305.27",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-05-22T16:30:00.000Z",
        "end": "2026-05-22T17:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11281
      },
      {
        "id": "sq",
        "name": "Sprint Qualifying",
        "start": "2026-05-22T20:30:00.000Z",
        "end": "2026-05-22T21:14:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11282
      },
      {
        "id": "sprint",
        "name": "Sprint",
        "start": "2026-05-23T16:00:00.000Z",
        "end": "2026-05-23T17:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11286
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-05-23T20:00:00.000Z",
        "end": "2026-05-23T21:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11287
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-05-24T20:00:00.000Z",
        "end": "2026-05-24T22:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11291
      }
    ],
    "trackAsset": "./tracks/canada.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmontrealblackoutline.svg",
    "trackSha256": "8900134804e43687bd988b8e82828039cf2ba08af92e49212a1c185b5b185992",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/canada"
  },
  {
    "id": "monaco",
    "round": 6,
    "title": "Monaco",
    "officialName": "FORMULA 1 LOUIS VUITTON GRAND PRIX DE MONACO 2026",
    "country": "Monaco",
    "location": "Monte Carlo",
    "circuit": "Circuit de Monaco",
    "flag": "MC",
    "date": "2026-06-07T13:00:00.000Z",
    "dateStart": "2026-06-05",
    "dateEnd": "2026-06-07",
    "timezone": "Europe/Monaco",
    "sprint": false,
    "lengthKm": "3.337",
    "laps": 78,
    "distanceKm": "260.286",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-06-05T11:30:00.000Z",
        "end": "2026-06-05T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11292
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-06-05T15:00:00.000Z",
        "end": "2026-06-05T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11293
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-06-06T10:30:00.000Z",
        "end": "2026-06-06T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11294
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-06-06T14:00:00.000Z",
        "end": "2026-06-06T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11295
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-06-07T13:00:00.000Z",
        "end": "2026-06-07T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11299
      }
    ],
    "trackAsset": "./tracks/monaco.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmontecarloblackoutline.svg",
    "trackSha256": "7a4ef43759ab12f53fb9f4c18ab2f7625dcd0213cba9f0c3bf0a0ff0f457721a",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/monaco"
  },
  {
    "id": "barcelona",
    "round": 7,
    "title": "Barcelona",
    "officialName": "FORMULA 1 MSC CRUISES GRAN PREMIO DE BARCELONA-CATALUNYA 2026",
    "country": "Spain",
    "location": "Barcelona",
    "circuit": "Circuit de Barcelona-Catalunya",
    "flag": "ES",
    "date": "2026-06-14T13:00:00.000Z",
    "dateStart": "2026-06-12",
    "dateEnd": "2026-06-14",
    "timezone": "Europe/Madrid",
    "sprint": false,
    "lengthKm": "4.657",
    "laps": 66,
    "distanceKm": "307.236",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-06-12T11:30:00.000Z",
        "end": "2026-06-12T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11300
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-06-12T15:00:00.000Z",
        "end": "2026-06-12T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11301
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-06-13T10:30:00.000Z",
        "end": "2026-06-13T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11302
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-06-13T14:00:00.000Z",
        "end": "2026-06-13T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11303
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-06-14T13:00:00.000Z",
        "end": "2026-06-14T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11307
      }
    ],
    "trackAsset": "./tracks/barcelona.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackcatalunyablackoutline.svg",
    "trackSha256": "b00b9950d493281f13ea72489aafba136c94acd86dd8c8d018043be751e4d10a",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/barcelona-catalunya"
  },
  {
    "id": "austria",
    "round": 8,
    "title": "Austrian",
    "officialName": "FORMULA 1 LENOVO AUSTRIAN GRAND PRIX 2026",
    "country": "Austria",
    "location": "Spielberg",
    "circuit": "Red Bull Ring",
    "flag": "AT",
    "date": "2026-06-28T13:00:00.000Z",
    "dateStart": "2026-06-26",
    "dateEnd": "2026-06-28",
    "timezone": "Europe/Vienna",
    "sprint": false,
    "lengthKm": "4.326",
    "laps": 71,
    "distanceKm": "307.026",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-06-26T11:30:00.000Z",
        "end": "2026-06-26T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11308
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-06-26T15:00:00.000Z",
        "end": "2026-06-26T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11309
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-06-27T10:30:00.000Z",
        "end": "2026-06-27T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11310
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-06-27T14:00:00.000Z",
        "end": "2026-06-27T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11311
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-06-28T13:00:00.000Z",
        "end": "2026-06-28T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11315
      }
    ],
    "trackAsset": "./tracks/austria.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackspielbergblackoutline.svg",
    "trackSha256": "85602e828cd255e2118bfa7d90a508c9a549c352febe4c3795d33142a354c8e7",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/austria"
  },
  {
    "id": "britain",
    "round": 9,
    "title": "British",
    "officialName": "FORMULA 1 PIRELLI BRITISH GRAND PRIX 2026",
    "country": "United Kingdom",
    "location": "Silverstone",
    "circuit": "Silverstone Circuit",
    "flag": "GB",
    "date": "2026-07-05T14:00:00.000Z",
    "dateStart": "2026-07-03",
    "dateEnd": "2026-07-05",
    "timezone": "Europe/London",
    "sprint": true,
    "lengthKm": "5.891",
    "laps": 52,
    "distanceKm": "306.198",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-07-03T11:30:00.000Z",
        "end": "2026-07-03T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11316
      },
      {
        "id": "sq",
        "name": "Sprint Qualifying",
        "start": "2026-07-03T15:30:00.000Z",
        "end": "2026-07-03T16:14:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11317
      },
      {
        "id": "sprint",
        "name": "Sprint",
        "start": "2026-07-04T11:00:00.000Z",
        "end": "2026-07-04T12:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11321
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-07-04T15:00:00.000Z",
        "end": "2026-07-04T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11322
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-07-05T14:00:00.000Z",
        "end": "2026-07-05T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11326
      }
    ],
    "trackAsset": "./tracks/britain.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026tracksilverstoneblackoutline.svg",
    "trackSha256": "946f5de282ee0925cbcd5d02fcf3781d58d9ed34cba1eee6bfc4ce86652f3d57",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/great-britain"
  },
  {
    "id": "belgium",
    "round": 10,
    "title": "Belgian",
    "officialName": "FORMULA 1 MOËT & CHANDON BELGIAN GRAND PRIX 2026",
    "country": "Belgium",
    "location": "Spa-Francorchamps",
    "circuit": "Circuit de Spa-Francorchamps",
    "flag": "BE",
    "date": "2026-07-19T13:00:00.000Z",
    "dateStart": "2026-07-17",
    "dateEnd": "2026-07-19",
    "timezone": "Europe/Brussels",
    "sprint": false,
    "lengthKm": "7.004",
    "laps": 44,
    "distanceKm": "308.054",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-07-17T11:30:00.000Z",
        "end": "2026-07-17T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11327
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-07-17T15:00:00.000Z",
        "end": "2026-07-17T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11328
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-07-18T10:30:00.000Z",
        "end": "2026-07-18T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11329
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-07-18T14:00:00.000Z",
        "end": "2026-07-18T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11330
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-07-19T13:00:00.000Z",
        "end": "2026-07-19T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11334
      }
    ],
    "trackAsset": "./tracks/belgium.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackspafrancorchampsblackoutline.svg",
    "trackSha256": "b86fa2b406fbdc54d68e59800e75b9fead332570079a5e69a71b311978266b91",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/belgium"
  },
  {
    "id": "hungary",
    "round": 11,
    "title": "Hungarian",
    "officialName": "FORMULA 1 AWS HUNGARIAN GRAND PRIX 2026",
    "country": "Hungary",
    "location": "Budapest",
    "circuit": "Hungaroring",
    "flag": "HU",
    "date": "2026-07-26T13:00:00.000Z",
    "dateStart": "2026-07-24",
    "dateEnd": "2026-07-26",
    "timezone": "Europe/Budapest",
    "sprint": false,
    "lengthKm": "4.381",
    "laps": 70,
    "distanceKm": "306.63",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-07-24T11:30:00.000Z",
        "end": "2026-07-24T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11335
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-07-24T15:00:00.000Z",
        "end": "2026-07-24T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11336
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-07-25T10:30:00.000Z",
        "end": "2026-07-25T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11337
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-07-25T14:00:00.000Z",
        "end": "2026-07-25T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11338
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-07-26T13:00:00.000Z",
        "end": "2026-07-26T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11342
      }
    ],
    "trackAsset": "./tracks/hungary.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackhungaroringblackoutline.svg",
    "trackSha256": "d2b8d27d221ed4a961cc6490db38769f32fc55e9b847a21c9c89ac152681247a",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/hungary"
  },
  {
    "id": "netherlands",
    "round": 12,
    "title": "Dutch",
    "officialName": "FORMULA 1 HEINEKEN DUTCH GRAND PRIX 2026",
    "country": "Netherlands",
    "location": "Zandvoort",
    "circuit": "Circuit Zandvoort",
    "flag": "NL",
    "date": "2026-08-23T13:00:00.000Z",
    "dateStart": "2026-08-21",
    "dateEnd": "2026-08-23",
    "timezone": "Europe/Amsterdam",
    "sprint": true,
    "lengthKm": "4.259",
    "laps": 72,
    "distanceKm": "306.592",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-08-21T10:30:00.000Z",
        "end": "2026-08-21T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11343
      },
      {
        "id": "sq",
        "name": "Sprint Qualifying",
        "start": "2026-08-21T14:30:00.000Z",
        "end": "2026-08-21T15:14:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11344
      },
      {
        "id": "sprint",
        "name": "Sprint",
        "start": "2026-08-22T10:00:00.000Z",
        "end": "2026-08-22T11:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11348
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-08-22T14:00:00.000Z",
        "end": "2026-08-22T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11349
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-08-23T13:00:00.000Z",
        "end": "2026-08-23T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11353
      }
    ],
    "trackAsset": "./tracks/netherlands.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackzandvoortblackoutline.svg",
    "trackSha256": "7548d1f627a39679733fb55e93fb8a77896292619f410c2b784c3211bccc0669",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/netherlands"
  },
  {
    "id": "italy",
    "round": 13,
    "title": "Italian",
    "officialName": "FORMULA 1 PIRELLI GRAN PREMIO D’ITALIA 2026",
    "country": "Italy",
    "location": "Monza",
    "circuit": "Autodromo Nazionale Monza",
    "flag": "IT",
    "date": "2026-09-06T13:00:00.000Z",
    "dateStart": "2026-09-04",
    "dateEnd": "2026-09-06",
    "timezone": "Europe/Rome",
    "sprint": false,
    "lengthKm": "5.793",
    "laps": 53,
    "distanceKm": "306.72",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-09-04T10:30:00.000Z",
        "end": "2026-09-04T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11354
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-09-04T14:00:00.000Z",
        "end": "2026-09-04T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11355
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-09-05T10:30:00.000Z",
        "end": "2026-09-05T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11356
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-09-05T14:00:00.000Z",
        "end": "2026-09-05T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11357
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-09-06T13:00:00.000Z",
        "end": "2026-09-06T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11361
      }
    ],
    "trackAsset": "./tracks/italy.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmonzablackoutline.svg",
    "trackSha256": "25cebbfd50eb1301dbdb0e73a029a69f9d9b92c8565515d39e7a8174845979c9",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/italy"
  },
  {
    "id": "madrid",
    "round": 14,
    "title": "Spanish",
    "officialName": "FORMULA 1 TAG HEUER GRAN PREMIO DE ESPAÑA 2026",
    "country": "Spain",
    "location": "Madrid",
    "circuit": "Madring",
    "flag": "ES",
    "date": "2026-09-13T13:00:00.000Z",
    "dateStart": "2026-09-11",
    "dateEnd": "2026-09-13",
    "timezone": "Europe/Madrid",
    "sprint": false,
    "lengthKm": "5.414",
    "laps": 57,
    "distanceKm": "308.399",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-09-11T11:30:00.000Z",
        "end": "2026-09-11T12:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11362
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-09-11T15:00:00.000Z",
        "end": "2026-09-11T16:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11363
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-09-12T10:30:00.000Z",
        "end": "2026-09-12T11:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11364
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-09-12T14:00:00.000Z",
        "end": "2026-09-12T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11365
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-09-13T13:00:00.000Z",
        "end": "2026-09-13T15:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11369
      }
    ],
    "trackAsset": "./tracks/madrid.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmadringblackoutline.svg",
    "trackSha256": "f4d1fe06b6199203cddcdc820cb314ab7aaa2399b8958bd8bbd69519d3f81877",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/spain"
  },
  {
    "id": "azerbaijan",
    "round": 15,
    "title": "Azerbaijan",
    "officialName": "FORMULA 1 QATAR AIRWAYS AZERBAIJAN GRAND PRIX 2026",
    "country": "Azerbaijan",
    "location": "Baku",
    "circuit": "Baku City Circuit",
    "flag": "AZ",
    "date": "2026-09-26T11:00:00.000Z",
    "dateStart": "2026-09-24",
    "dateEnd": "2026-09-26",
    "timezone": "Asia/Baku",
    "sprint": false,
    "lengthKm": "6.003",
    "laps": 51,
    "distanceKm": "306.049",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-09-24T08:30:00.000Z",
        "end": "2026-09-24T09:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11370
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-09-24T12:00:00.000Z",
        "end": "2026-09-24T13:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11371
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-09-25T08:30:00.000Z",
        "end": "2026-09-25T09:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11372
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-09-25T12:00:00.000Z",
        "end": "2026-09-25T13:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11373
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-09-26T11:00:00.000Z",
        "end": "2026-09-26T13:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11377
      }
    ],
    "trackAsset": "./tracks/azerbaijan.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackbakublackoutline.svg",
    "trackSha256": "26c7d39a89774dafe328eeb730fab1f0aad84ec679bfa5711a54158ef78a2a19",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/azerbaijan"
  },
  {
    "id": "bahrain",
    "round": 16,
    "title": "Bahrain",
    "officialName": "FORMULA 1 GULF AIR BAHRAIN GRAND PRIX IN MALAYSIA 2026",
    "country": "Malaysia",
    "location": "Kuala Lumpur",
    "circuit": "Sepang International Circuit",
    "flag": "MY",
    "date": "2026-10-04T07:00:00.000Z",
    "dateStart": "2026-10-02",
    "dateEnd": "2026-10-04",
    "timezone": "Asia/Kuala_Lumpur",
    "sprint": false,
    "lengthKm": "5.543",
    "laps": 56,
    "distanceKm": "310.417",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-10-02T04:30:00.000Z",
        "end": "2026-10-02T05:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11727
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-10-02T08:00:00.000Z",
        "end": "2026-10-02T09:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11728
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-10-03T04:30:00.000Z",
        "end": "2026-10-03T05:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11729
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-10-03T08:00:00.000Z",
        "end": "2026-10-03T09:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11730
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-10-04T07:00:00.000Z",
        "end": "2026-10-04T09:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11731
      }
    ],
    "trackAsset": "./tracks/bahrain.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackkualalumpurblackoutline.svg",
    "trackSha256": "e4df6c74a5d19120e9f9865eb335f0687be8a4bfa28c9ea3e870632df1573619",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/bahrain"
  },
  {
    "id": "singapore",
    "round": 17,
    "title": "Singapore",
    "officialName": "FORMULA 1 SINGAPORE AIRLINES SINGAPORE GRAND PRIX 2026",
    "country": "Singapore",
    "location": "Marina Bay",
    "circuit": "Marina Bay Street Circuit",
    "flag": "SG",
    "date": "2026-10-11T12:00:00.000Z",
    "dateStart": "2026-10-09",
    "dateEnd": "2026-10-11",
    "timezone": "Asia/Singapore",
    "sprint": true,
    "lengthKm": "4.927",
    "laps": 62,
    "distanceKm": "305.337",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-10-09T08:30:00.000Z",
        "end": "2026-10-09T09:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11378
      },
      {
        "id": "sq",
        "name": "Sprint Qualifying",
        "start": "2026-10-09T12:30:00.000Z",
        "end": "2026-10-09T13:14:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11379
      },
      {
        "id": "sprint",
        "name": "Sprint",
        "start": "2026-10-10T09:00:00.000Z",
        "end": "2026-10-10T09:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11383
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-10-10T13:00:00.000Z",
        "end": "2026-10-10T14:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11384
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-10-11T12:00:00.000Z",
        "end": "2026-10-11T14:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11388
      }
    ],
    "trackAsset": "./tracks/singapore.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026tracksingaporeblackoutline.svg",
    "trackSha256": "aa2ccd41ee4f01cf2d77e645d3499198585d7817483657b6930ccc6ace5996bc",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/singapore"
  },
  {
    "id": "united-states",
    "round": 18,
    "title": "United States",
    "officialName": "FORMULA 1 MSC CRUISES UNITED STATES GRAND PRIX 2026",
    "country": "United States",
    "location": "Austin",
    "circuit": "Circuit of The Americas",
    "flag": "US",
    "date": "2026-10-25T20:00:00.000Z",
    "dateStart": "2026-10-23",
    "dateEnd": "2026-10-25",
    "timezone": "US/Central",
    "sprint": false,
    "lengthKm": "5.513",
    "laps": 56,
    "distanceKm": "308.432",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-10-23T17:30:00.000Z",
        "end": "2026-10-23T18:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11389
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-10-23T21:00:00.000Z",
        "end": "2026-10-23T22:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11390
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-10-24T17:30:00.000Z",
        "end": "2026-10-24T18:30:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11391
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-10-24T21:00:00.000Z",
        "end": "2026-10-24T22:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11392
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-10-25T20:00:00.000Z",
        "end": "2026-10-25T22:00:00.000Z",
        "sourceState": "completed",
        "sourceSessionId": 11396
      }
    ],
    "trackAsset": "./tracks/united-states.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackaustinblackoutline.svg",
    "trackSha256": "3c0a75372b3223daeb6dec1558e9b4c16bd4860872f78ab90e5b076d0ad536c2",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/united-states"
  },
  {
    "id": "mexico-city",
    "round": 19,
    "title": "Mexico City",
    "officialName": "FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2026",
    "country": "Mexico",
    "location": "Mexico City",
    "circuit": "Autódromo Hermanos Rodríguez",
    "flag": "MX",
    "date": "2026-11-01T20:00:00.000Z",
    "dateStart": "2026-10-30",
    "dateEnd": "2026-11-01",
    "timezone": "America/Mexico_City",
    "sprint": false,
    "lengthKm": "4.304",
    "laps": 71,
    "distanceKm": "305.354",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-10-30T18:30:00.000Z",
        "end": "2026-10-30T19:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11397
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-10-30T22:00:00.000Z",
        "end": "2026-10-30T23:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11398
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-10-31T17:30:00.000Z",
        "end": "2026-10-31T18:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11399
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-10-31T21:00:00.000Z",
        "end": "2026-10-31T22:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11400
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-11-01T20:00:00.000Z",
        "end": "2026-11-01T22:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11404
      }
    ],
    "trackAsset": "./tracks/mexico-city.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackmexicocityblackoutline.svg",
    "trackSha256": "05118c0e22e3d3ffdc061fd14c39da1f9e88ac741c688305757dbd49ce19ffe6",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/mexico"
  },
  {
    "id": "sao-paulo",
    "round": 20,
    "title": "São Paulo",
    "officialName": "FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026",
    "country": "Brazil",
    "location": "São Paulo",
    "circuit": "Autódromo José Carlos Pace",
    "flag": "BR",
    "date": "2026-11-08T17:00:00.000Z",
    "dateStart": "2026-11-06",
    "dateEnd": "2026-11-08",
    "timezone": "America/Sao_Paulo",
    "sprint": false,
    "lengthKm": "4.309",
    "laps": 71,
    "distanceKm": "305.879",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-11-06T15:30:00.000Z",
        "end": "2026-11-06T16:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11405
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-11-06T19:00:00.000Z",
        "end": "2026-11-06T20:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11406
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-11-07T14:30:00.000Z",
        "end": "2026-11-07T15:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11407
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-11-07T18:00:00.000Z",
        "end": "2026-11-07T19:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11408
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-11-08T17:00:00.000Z",
        "end": "2026-11-08T19:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11412
      }
    ],
    "trackAsset": "./tracks/sao-paulo.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackinterlagosblackoutline.svg",
    "trackSha256": "e6c595ee86c375a69dd204c8ac32eca036bb4f65a376bef866e42ce132b85ffa",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/brazil"
  },
  {
    "id": "las-vegas",
    "round": 21,
    "title": "Las Vegas",
    "officialName": "FORMULA 1 HEINEKEN LAS VEGAS GRAND PRIX 2026",
    "country": "United States",
    "location": "Las Vegas",
    "circuit": "Las Vegas Strip Circuit",
    "flag": "US",
    "date": "2026-11-22T04:00:00.000Z",
    "dateStart": "2026-11-19",
    "dateEnd": "2026-11-21",
    "timezone": "America/Los_Angeles",
    "sprint": false,
    "lengthKm": "6.201",
    "laps": 50,
    "distanceKm": "309.958",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-11-20T00:30:00.000Z",
        "end": "2026-11-20T01:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11413
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-11-20T04:00:00.000Z",
        "end": "2026-11-20T05:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11414
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-11-21T00:30:00.000Z",
        "end": "2026-11-21T01:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11415
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-11-21T04:00:00.000Z",
        "end": "2026-11-21T05:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11416
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-11-22T04:00:00.000Z",
        "end": "2026-11-22T06:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11420
      }
    ],
    "trackAsset": "./tracks/las-vegas.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026tracklasvegasblackoutline.svg",
    "trackSha256": "3fbba3ec0c219505937cea480c2803188e396f0a17f4b6661404925b8c10ccea",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/las-vegas"
  },
  {
    "id": "qatar",
    "round": 22,
    "title": "Qatar",
    "officialName": "FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2026",
    "country": "Qatar",
    "location": "Lusail",
    "circuit": "Lusail International Circuit",
    "flag": "QA",
    "date": "2026-11-29T16:00:00.000Z",
    "dateStart": "2026-11-27",
    "dateEnd": "2026-11-29",
    "timezone": "Asia/Qatar",
    "sprint": false,
    "lengthKm": "5.419",
    "laps": 57,
    "distanceKm": "308.611",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-11-27T13:30:00.000Z",
        "end": "2026-11-27T14:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11421
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-11-27T17:00:00.000Z",
        "end": "2026-11-27T18:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11422
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-11-28T14:30:00.000Z",
        "end": "2026-11-28T15:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11423
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-11-28T18:00:00.000Z",
        "end": "2026-11-28T19:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11424
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-11-29T16:00:00.000Z",
        "end": "2026-11-29T18:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11428
      }
    ],
    "trackAsset": "./tracks/qatar.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026tracklusailblackoutline.svg",
    "trackSha256": "d0221d3ed8d82f5f8c2ea1b36480297dc2854491fff9f797b33641b1e1e4cc9e",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/qatar"
  },
  {
    "id": "abu-dhabi",
    "round": 23,
    "title": "Abu Dhabi",
    "officialName": "FORMULA 1 ETIHAD AIRWAYS ABU DHABI GRAND PRIX 2026",
    "country": "United Arab Emirates",
    "location": "Yas Marina",
    "circuit": "Yas Marina Circuit",
    "flag": "AE",
    "date": "2026-12-06T13:00:00.000Z",
    "dateStart": "2026-12-04",
    "dateEnd": "2026-12-06",
    "timezone": "Asia/Dubai",
    "sprint": false,
    "lengthKm": "5.281",
    "laps": 58,
    "distanceKm": "306.188",
    "sessions": [
      {
        "id": "fp1",
        "name": "Practice 1",
        "start": "2026-12-04T09:30:00.000Z",
        "end": "2026-12-04T10:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11429
      },
      {
        "id": "fp2",
        "name": "Practice 2",
        "start": "2026-12-04T13:00:00.000Z",
        "end": "2026-12-04T14:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11430
      },
      {
        "id": "fp3",
        "name": "Practice 3",
        "start": "2026-12-05T10:30:00.000Z",
        "end": "2026-12-05T11:30:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11431
      },
      {
        "id": "qualifying",
        "name": "Qualifying",
        "start": "2026-12-05T14:00:00.000Z",
        "end": "2026-12-05T15:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11432
      },
      {
        "id": "race",
        "name": "Race",
        "start": "2026-12-06T13:00:00.000Z",
        "end": "2026-12-06T15:00:00.000Z",
        "sourceState": "upcoming",
        "sourceSessionId": 11436
      }
    ],
    "trackAsset": "./tracks/abu-dhabi.svg",
    "trackSourceUrl": "https://media.formula1.com/image/upload/common/f1/2026/track/2026trackyasmarinacircuitblackoutline.svg",
    "trackSha256": "52480a45a6d02e8375f79ce035dca8280d11daf89c20b14961cdc86c358a3af1",
    "sourceUrl": "https://www.formula1.com/en/racing/2026/united-arab-emirates"
  }
];
