Just for fun coding React Native Uber -clone https://www.youtube.com/watch?v=bvn_HYpix6s

Learning to use some Google Maps, Tailwind CSS, and React Native Navigation, modifying Uber clone for Android.

Works with emulator Android Studio opened on Android. There is some google components not working with web option, so needs modification if web needed.

**.env**

ENV=development

GOOGLE_MAPS_APIKEY= set google maps api key here

**usage:**

$ npm install

using Android Studio:

$ npm start

choose 'a'

**..some errors and solutions along the way while modifying for Android..**

..reanimated..

-> add to file babel.config.js 

plugins: ['react-native-reanimated/plugin']

$ npx expo start -c

..invariant error..
..render error div must be function..

-> check if there is import from react-native-web

change to import from react-native

..safeAriaView..

-> use react-native-safe-area-context

..flatlist not showing..

-> might need renderItem... => { return ( ... )}

..can't find variable:intl..

-> add to file app.config.js

//..
slug: "...",
jsEngine: "hermes",
//...

..TouchableObasity not working if styled with absolute..

-> might need <TouchableObasity style={[tw`...`, { zIndex: 1 }]}>
