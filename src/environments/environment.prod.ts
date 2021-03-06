// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  region: 'us-east-1',

  identityPoolId: 'us-east-1:9c5e5bca-cfef-40c6-8f18-575692dcab41',
  projectId: 'us-east-1_zI0af0OBy',
  clientId: '012179919676',
  userPoolClientId: '2po2juo8jljkirra4jtsfi2ro1',

  rekognitionBucket: 'rekognition-pics',
  albumName: 'usercontent',
  bucketRegion: 'us-east-1',
  growlErrorHeadingMessage: 'Error Message',
  nameMaxLength: 50,
  codeMaxLength: 25,
  successMsgTime: 2000,

    ddbTableName: 'Nicbit-UserLoginTrail',

  accessKeyId: 'AKIAJ2PO7IHZQOMBDTSQ',
  secretAccessKey: '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',

    // server: 'https://3res4rfg17.execute-api.us-east-1.amazonaws.com/ngdev/',
    server: 'https://slsapi.akwa.io/',
    serverEnv: '/qc',
    // server: 'https://jhk4ofok49.execute-api.us-east-1.amazonaws.com/validations/',

  ravenurl: 'https://1095c0d960c141b09d164cc676ff6ef2@sentry.io/161042',

  googleClientID: '43259740798-d0th2m8ak2tlpdfhuved5fvgb8hv6hk0.apps.googleusercontent.com',

  // http://192.168.9.103:9999/v1/';//'http://strykerapi.nicbitqc.ossclients.com';

  cloudinaryUploaderOptions: {
    url: `https://api.cloudinary.com/v1_1/drvjylp2e/upload`,
    autoUpload: true,
    isHTML5: true,
    removeAfterUpload: true,
    headers: [
      {
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }
    ]
  },

  cloudinaryPreset: 'nlnltoua',

  refreshSession: 5, // mins

  defaultConfig: {
        numRows: '10',
        dateFormat: 'MM/DD/YYYY',
        dateTimeFormat: 'MM/DD/YYYY HH:mm',
        timeZone: 'US/Eastern',
        measurementUnit: 'Metric',
        temperatureUnit: 'celsius'
  },

  cloudinaryImageOptions: {
      largeImageSize: 'w_500,h_500,c_limit',
      thumbImageSize: 'w_100,h_100,c_limit'
  },

  orderStatus: {
      'Draft' : 5,
      'Open' : 10,
      'PartialShipped' : 25,
      'Shipped': 40,
      'PartialDelivered': 45,
      'Delivered' : 60,
      'Canceled' : 70,
      'Submitted' : 80,
      'Closed' : 90
  },

  shipmentStatus: {
      'Open' : 10,
      'Scheduled' : 20,
      'PartialShipped' : 25,
      'SoftShipped' : 30,
      'Shipped': 40,
      'PartialDelivered': 45,
      'SoftDelivered' : 50,
      'Delivered' : 60,
      'Canceled' : 70,
      'Closed' : 90
  },

  itemStatus: {
      'Open' : 10,
      'Scheduled' : 20,
      'SoftShipped' : 30,
      'Shipped': 40,
      'SoftDelivered' : 50,
      'Delivered' : 60,
      'Canceled' : 70,
      'Closed' : 90
  },

  calDtFormatsMapping: {
    'MM/DD/YYYY' : 'mm/dd/yy',
    'MM-DD-YYYY' : 'mm.dd.yy',
    'DD/MM/YYYY' : 'dd/mm/yy',
    'DD-MM-YYYY': 'dd-mm-yy',
    'YYYYY/DD/MM' : 'yy/dd/mm',
    'YYYYY-DD-MM' : 'yy-dd-mm',
    'DD Mon YYYY' : 'dd M yy',
    'DD Month YYYY' : 'dd MM yy'
  },

  calDtTmFormatsMapping: {
    'MM/DD/Y HH:mm' : 'mm/dd/yy',
    'MM-DD-Y HH:mm' : 'mm.dd.yy',
    'DD/MM/Y HH:mm' : 'dd/mm/yy',
    'DD-MM-Y HH:mm': 'dd-mm-yy',
    'Y/DD/MM HH:mm' : 'yy/dd/mm',
    'Y-DD-MM HH:mm' : 'yy-dd-mm',
    'DD MMM Y HH:mm' : 'dd M yy',
    'DD MMMM Y HH:mm' : 'dd MM yy'
  },
  
  discardReasons : {
    '' : 'Select Discard Reason',
    'noise' : 'Noise',
    'invalidType' : 'Field Type/value',
    'duplicate' : 'Duplicate'
  },

  iotTopics : {
      product: 'ak-012179919676-us-east-1_zI0af0OBy-productTracking',
      shipment: 'ak-012179919676-us-east-1_zI0af0OBy-shipmentTracking',
      device: 'ak-012179919676-us-east-1_zI0af0OBy-deviceTracking',
      user: 'ak-012179919676-us-east-1_zI0af0OBy-userTracking'
  },

  adminRole: 'role-core-akadmin',

  UAKeys: {
      "role-core-AkSalesRep":{
        appKey: 'x_NN_7IqTtynLajyjQaJiw',
        token: 'MTp4X05OXzdJcVR0eW5MYWp5alFhSml3OnlqTG9feHNuUW1Vdm5mTk9mUGZ0OHlpM05TRXAyQ01PZFFJS3J2LWJqeEk',
        vapidPublicKey: 'BAoW8bpdpBf6h_RhBq8s0Fbo8JwD_ro_U-W5U_CUtCggMzfv9pkDPDYBNYukqzAyVAmlhzC3MBiLcoxjbSa_EmY=',
      },
      "role-core-AkCarrier":{
        appKey: 'x_NN_7IqTtynLajyjQaJiw',
        token: 'MTp4X05OXzdJcVR0eW5MYWp5alFhSml3OnlqTG9feHNuUW1Vdm5mTk9mUGZ0OHlpM05TRXAyQ01PZFFJS3J2LWJqeEk',
        vapidPublicKey: 'BAoW8bpdpBf6h_RhBq8s0Fbo8JwD_ro_U-W5U_CUtCggMzfv9pkDPDYBNYukqzAyVAmlhzC3MBiLcoxjbSa_EmY=',
      },
      "role-core-akadmin":{
        appKey: 'x_NN_7IqTtynLajyjQaJiw',
        token: 'MTp4X05OXzdJcVR0eW5MYWp5alFhSml3OnlqTG9feHNuUW1Vdm5mTk9mUGZ0OHlpM05TRXAyQ01PZFFJS3J2LWJqeEk',
        vapidPublicKey: 'BAoW8bpdpBf6h_RhBq8s0Fbo8JwD_ro_U-W5U_CUtCggMzfv9pkDPDYBNYukqzAyVAmlhzC3MBiLcoxjbSa_EmY=',
      }
    },
  userType: 'User',

  mapDateTimeFormat: 'y MMM d HH:mm:s'
  
};
