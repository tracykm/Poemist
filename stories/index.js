import React from 'react';
import 'reset-css/_reset.scss';

import { storiesOf, action, linkTo } from '@kadira/storybook';
import { camelizeKeys } from 'humps';
import Button from './Button';
import Welcome from './Welcome';
// import Word from '../frontend/components/singlePoem/word.jsx';
import Poem from '../src/components/poem/Poem.jsx';
import { makePassageChunks } from '../src/utils/selectedText';

import '../src/components/_app.scss';

//
// storiesOf('StyleToolbar', module)
//   .add('with text', () => (
//     <Word word={[{is_selected: true, ch: "w"}, {is_selected: false, ch: "o"}]} key={4} wordIdx={4}/>
//   ));
//
const poem = camelizeKeys(JSON.parse(
  `{
    "id":615,
    "passage":"nd that Tess came of that exhausted ancient line, and was not of the new tribes from below, as he had fondly dreamed, why had he not stoically abandoned her in fidelity to his principles? This was what he had got by apostasy, and his punishment was deserved. Then he became weary and anxious, and his anxiety increased. He wondered if he had treated her unfairly. He ate without knowing that he ate, and drank without tasting. As the hours dropped past, as the motive of each act in the long series of bygone days presented itself to his view, he perceived how intimately the notion of having Tess as a dear possession was mixed up with all his schemes and words and ways. In going hither and thither he observed in the outskirts of a small town a red-and-blue placard setting forth the great advantages of the Empire of Brazil as a field for the emigrating agriculturist. Land was offered there on exceptionally advantageous terms. Brazil somewhat attracted him as a new idea. Tess could eventually j",
    "book_id":16,
    "created_at":"2016-11-05T20:09:59.184Z",
    "book_title":"The Island of Dr. Moreau",
    "author_id":75,
    "author":"redwood",
    "selected_texts":[[614,615],[576,583],[502,509],[418,425],[392,410],[197,202],[176,188],[122,126],[98,102],[8,13]],
    "centered":false,
    "color_range":16,
    "background_id":27,
    "font_set_id":1,
    "likes":{}
  }`
));

const poem2 = camelizeKeys(JSON.parse(
  `{
    "id":615,
    "passage":"nd that Tess came of that exhausted ancient line, and was not of the new tribes from below, as he had fondly dreamed, why had he not stoically abandoned her in fidelity to his principles? This was what he had got by apostasy, and his punishment was deserved. Then he became weary and anxious, and his anxiety increased. He wondered if he had treated her unfairly. He ate without knowing that he ate, and drank without tasting. As the hours dropped past, as the motive of each act in the long series of bygone days presented itself to his view, he perceived how intimately the notion of having Tess as a dear possession was mixed up with all his schemes and words and ways. In going hither and thither he observed in the outskirts of a small town a red-and-blue placard setting forth the great advantages of the Empire of Brazil as a field for the emigrating agriculturist. Land was offered there on exceptionally advantageous terms. Brazil somewhat attracted him as a new idea. Tess could eventually j",
    "book_id":16,
    "created_at":"2016-11-05T20:09:59.184Z",
    "book_title":"The Island of Dr. Moreau",
    "author_id":75,
    "author":"redwood",
    "selected_texts":[[614,615],[576,583],[502,509],[418,425],[392,410],[197,202],[176,188],[122,126],[98,102],[8,13]],
    "centered":false,
    "color_range":16,
    "background_id":27,
    "font_set_id":1,
    "likes":{}
  }`
));

const { selectedTexts, passage } = poem;

poem.text = makePassageChunks({ selectedTexts, passage });
// const currentUser = JSON.parse(
//   `{"id":2,
// "username":"tracy","img_url":null,"description":"Only the creator of everything ever.","created_at":"2015-12-22T00:25:11.819Z","poem_ids":[49,11,38,113,45,244,85,52,61,253,372,257,343,56,555,314,316,369,503,398,97,399,401,402,404,406,420,447,475,428,514,526,527,541,542,548,550,574,580],"liked_poem_ids":[2,3,21,30,32,34,35,37,52,56,76,91,92,93,94,95,103,124,149,150,209,213,235,238,250,252,301,302,341,367,405,413,414,416,419,424,427,472,490,491,499,500,505,510,511,513,519,521,522,523,525,528,530,532,533,537,539,542,544,547,548,549,553,567,573],"notifications":{"14":{"id":14,"liker":"Lema","liker_id":4,"created_at":"2015-12-22T08:30:22.883Z","poem_id":11,"seen":true},"62":{"id":62,"liker":"colljessmull","liker_id":9,"created_at":"2015-12-26T18:31:46.985Z","poem_id":11,"seen":true},"94":{"id":94,"liker":"Guest","liker_id":7,"created_at":"2016-01-03T19:37:34.384Z","poem_id":45,"seen":true},"162":{"id":162,"liker":"clancy","liker_id":12,"created_at":"2016-01-04T22:50:02.722Z","poem_id":56,"seen":true},"216":{"id":216,"liker":"Guest","liker_id":7,"created_at":"2016-01-06T23:23:03.500Z","poem_id":85,"seen":true},"220":{"id":220,"liker":"Walrus","liker_id":15,"created_at":"2016-01-07T04:16:03.726Z","poem_id":52,"seen":true},"229":{"id":229,"liker":"Jenny","liker_id":16,"created_at":"2016-01-07T05:38:24.021Z","poem_id":56,"seen":true},"235":{"id":235,"liker":"Namby","liker_id":17,"created_at":"2016-01-07T05:46:22.319Z","poem_id":85,"seen":true},"237":{"id":237,"liker":"Namby","liker_id":17,"created_at":"2016-01-07T05:46:31.142Z","poem_id":56,"seen":true},"238":{"id":238,"liker":"Namby","liker_id":17,"created_at":"2016-01-07T05:46:34.614Z","poem_id":52,"seen":true},"257":{"id":257,"liker":"wallawalla","liker_id":1,"created_at":"2016-01-07T13:12:23.488Z","poem_id":85,"seen":true},"258":{"id":258,"liker":"wallawalla","liker_id":1,"created_at":"2016-01-07T13:12:33.150Z","poem_id":56,"seen":true},"279":{"id":279,"liker":"wallawalla","liker_id":1,"created_at":"2016-01-09T09:00:04.700Z","poem_id":52,"seen":true},"292":{"id":292,"liker":"Lindsey","liker_id":18,"created_at":"2016-01-12T04:09:59.244Z","poem_id":97,"seen":true},"295":{"id":295,"liker":"Lindsey","liker_id":18,"created_at":"2016-01-12T04:10:17.105Z","poem_id":56,"seen":true},"296":{"id":296,"liker":"Lindsey","liker_id":18,"created_at":"2016-01-12T04:10:19.531Z","poem_id":52,"seen":true},"305":{"id":305,"liker":"Hailey","liker_id":19,"created_at":"2016-01-12T11:03:12.817Z","poem_id":97,"seen":true},"308":{"id":308,"liker":"Hailey","liker_id":19,"created_at":"2016-01-12T11:03:32.302Z","poem_id":56,"seen":true},"309":{"id":309,"liker":"Hailey","liker_id":19,"created_at":"2016-01-12T11:03:35.427Z","poem_id":52,"seen":true},"333":{"id":333,"liker":"lance","liker_id":21,"created_at":"2016-01-14T06:57:27.180Z","poem_id":52,"seen":true},"335":{"id":335,"liker":"natasha","liker_id":23,"created_at":"2016-01-14T07:00:26.439Z","poem_id":61,"seen":true},"336":{"id":336,"liker":"natasha","liker_id":23,"created_at":"2016-01-14T07:00:29.028Z","poem_id":52,"seen":true},"353":{"id":353,"liker":"Guest","liker_id":7,"created_at":"2016-01-14T23:01:43.900Z","poem_id":56,"seen":true},"354":{"id":354,"liker":"Guest","liker_id":7,"created_at":"2016-01-14T23:01:45.884Z","poem_id":61,"seen":true},"415":{"id":415,"liker":"Sarah","liker_id":25,"created_at":"2016-01-19T05:06:03.645Z","poem_id":56,"seen":true},"555":{"id":555,"liker":"Guest","liker_id":7,"created_at":"2016-01-22T02:06:00.059Z","poem_id":113,"seen":true},"577":{"id":577,"liker":"blankMo","liker_id":30,"created_at":"2016-01-29T05:26:16.299Z","poem_id":244,"seen":true},"624":{"id":624,"liker":"Namby","liker_id":17,"created_at":"2016-02-05T06:18:51.877Z","poem_id":244,"seen":true},"654":{"id":654,"liker":"sageApple","liker_id":39,"created_at":"2016-02-06T18:07:31.054Z","poem_id":113,"seen":true},"715":{"id":715,"liker":"Namby","liker_id":17,"created_at":"2016-02-15T03:45:14.533Z","poem_id":316,"seen":true},"725":{"id":725,"liker":"twibble","liker_id":44,"created_at":"2016-02-16T03:18:47.514Z","poem_id":316,"seen":true},"739":{"id":739,"liker":"blankMo","liker_id":30,"created_at":"2016-02-17T06:25:10.770Z","poem_id":316,"seen":true},"743":{"id":743,"liker":"JaneD","liker_id":26,"created_at":"2016-02-18T02:11:25.375Z","poem_id":316,"seen":true},"748":{"id":748,"liker":"sageApple","liker_id":39,"created_at":"2016-02-19T00:29:52.104Z","poem_id":316,"seen":true},"784":{"id":784,"liker":"dark_tina","liker_id":46,"created_at":"2016-03-06T05:10:23.409Z","poem_id":343,"seen":true},"814":{"id":814,"liker":"blankMo","liker_id":30,"created_at":"2016-03-22T03:05:45.166Z","poem_id":343,"seen":true},"823":{"id":823,"liker":"benster","liker_id":38,"created_at":"2016-03-30T23:05:59.735Z","poem_id":372,"seen":true},"833":{"id":833,"liker":"babarooa","liker_id":51,"created_at":"2016-04-07T02:53:44.704Z","poem_id":372,"seen":true},"847":{"id":847,"liker":"rainbow","liker_id":54,"created_at":"2016-04-12T22:53:32.954Z","poem_id":372,"seen":true},"851":{"id":851,"liker":"dark_tina","liker_id":46,"created_at":"2016-04-13T01:32:05.583Z","poem_id":372,"seen":true},"855":{"id":855,"liker":"Jenny","liker_id":16,"created_at":"2016-04-18T20:18:35.907Z","poem_id":406,"seen":true},"857":{"id":857,"liker":"Jenny","liker_id":16,"created_at":"2016-04-18T20:18:43.032Z","poem_id":404,"seen":true},"870":{"id":870,"liker":"blankMo","liker_id":30,"created_at":"2016-04-26T15:21:22.941Z","poem_id":406,"seen":true},"875":{"id":875,"liker":"Guest","liker_id":7,"created_at":"2016-04-27T22:47:15.229Z","poem_id":428,"seen":true},"880":{"id":880,"liker":"nrlr","liker_id":59,"created_at":"2016-04-29T00:18:55.318Z","poem_id":428,"seen":true},"882":{"id":882,"liker":"theEnd","liker_id":61,"created_at":"2016-04-29T19:54:41.112Z","poem_id":428,"seen":true},"884":{"id":884,"liker":"blankMo","liker_id":30,"created_at":"2016-05-01T02:38:03.724Z","poem_id":428,"seen":true},"890":{"id":890,"liker":"babarooa","liker_id":51,"created_at":"2016-05-04T16:15:07.125Z","poem_id":428,"seen":true},"893":{"id":893,"liker":"babarooa","liker_id":51,"created_at":"2016-05-04T16:15:41.383Z","poem_id":406,"seen":true},"894":{"id":894,"liker":"babarooa","liker_id":51,"created_at":"2016-05-04T16:15:50.642Z","poem_id":404,"seen":true},"896":{"id":896,"liker":"blankMo","liker_id":30,"created_at":"2016-05-04T16:18:43.820Z","poem_id":52,"seen":true},"903":{"id":903,"liker":"Jenny","liker_id":16,"created_at":"2016-05-04T20:34:08.879Z","poem_id":428,"seen":true},"911":{"id":911,"liker":"sageApple","liker_id":39,"created_at":"2016-05-05T18:42:59.730Z","poem_id":428,"seen":true},"915":{"id":915,"liker":"AmandaA","liker_id":62,"created_at":"2016-05-14T02:51:03.337Z","poem_id":447,"seen":true},"925":{"id":925,"liker":"greenGenie","liker_id":63,"created_at":"2016-05-18T07:40:40.884Z","poem_id":428,"seen":true},"929":{"id":929,"liker":"greenGenie","liker_id":63,"created_at":"2016-05-18T07:41:55.178Z","poem_id":372,"seen":true},"948":{"id":948,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T18:44:26.333Z","poem_id":475,"seen":true},"955":{"id":955,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T18:46:21.083Z","poem_id":428,"seen":true},"957":{"id":957,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T18:46:50.942Z","poem_id":406,"seen":true},"960":{"id":960,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:48:01.889Z","poem_id":372,"seen":true},"968":{"id":968,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:49:40.988Z","poem_id":316,"seen":true},"980":{"id":980,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:51:41.116Z","poem_id":244,"seen":true},"994":{"id":994,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:54:03.932Z","poem_id":113,"seen":true},"995":{"id":995,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:54:15.894Z","poem_id":97,"seen":true},"998":{"id":998,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:54:45.164Z","poem_id":56,"seen":true},"999":{"id":999,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:54:47.141Z","poem_id":52,"seen":true},"1001":{"id":1001,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:55:00.281Z","poem_id":38,"seen":true},"1007":{"id":1007,"liker":"unicorn","liker_id":68,"created_at":"2016-06-04T19:56:55.128Z","poem_id":11,"seen":true},"1013":{"id":1013,"liker":"MeanSparrow","liker_id":70,"created_at":"2016-06-16T00:37:18.930Z","poem_id":475,"seen":true},"1019":{"id":1019,"liker":"baker","liker_id":71,"created_at":"2016-06-17T18:43:52.135Z","poem_id":475,"seen":true},"1026":{"id":1026,"liker":"baker","liker_id":71,"created_at":"2016-06-17T18:49:00.851Z","poem_id":428,"seen":true},"1029":{"id":1029,"liker":"baker","liker_id":71,"created_at":"2016-06-17T18:49:34.978Z","poem_id":406,"seen":true},"1030":{"id":1030,"liker":"baker","liker_id":71,"created_at":"2016-06-17T18:49:43.837Z","poem_id":404,"seen":true},"1035":{"id":1035,"liker":"baker","liker_id":71,"created_at":"2016-06-17T19:02:37.143Z","poem_id":372,"seen":true},"1040":{"id":1040,"liker":"baker","liker_id":71,"created_at":"2016-06-17T19:03:04.503Z","poem_id":343,"seen":true},"1045":{"id":1045,"liker":"baker","liker_id":71,"created_at":"2016-06-17T19:03:35.966Z","poem_id":316,"seen":true},"1060":{"id":1060,"liker":"baker","liker_id":71,"created_at":"2016-06-17T19:06:34.558Z","poem_id":113,"seen":true},"1063":{"id":1063,"liker":"baker","liker_id":71,"created_at":"2016-06-17T19:07:10.248Z","poem_id":56,"seen":true},"1066":{"id":1066,"liker":"baker","liker_id":71,"created_at":"2016-06-17T19:07:38.715Z","poem_id":11,"seen":true},"1073":{"id":1073,"liker":"blankMo","liker_id":30,"created_at":"2016-06-25T09:21:05.831Z","poem_id":503,"seen":true},"1081":{"id":1081,"liker":"blankMo","liker_id":30,"created_at":"2016-06-25T09:21:54.294Z","poem_id":475,"seen":true},"1085":{"id":1085,"liker":"jenny","liker_id":48,"created_at":"2016-07-03T07:24:16.096Z","poem_id":514,"seen":true},"1109":{"id":1109,"liker":"unicorn","liker_id":68,"created_at":"2016-07-15T14:10:51.172Z","poem_id":527,"seen":true},"1135":{"id":1135,"liker":"dark_tina","liker_id":46,"created_at":"2016-10-03T22:30:06.613Z","poem_id":555,"seen":false}}}`
// );

storiesOf('Poem', module)
  .add('with text', () => (
    <Poem
      poem={poem}
    />
  ))
  .add('currentUser', () => (
    <Poem
      poem={poem}
      isCurrentUser
    />
  ))
  .add('loading', () => (
    <Poem />
  ));
