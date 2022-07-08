// all images imported from images directory
import product_01 from '../images/heinekenkrat.jfif';
import product_02 from '../images/heineken6.jpg';
import product_03 from '../images/6pack.jfif';
import product_04 from '../images/corona.jfif';
import product_05 from '../images/desp.jfif';
import product_06 from '../images/laysn.jfif';
import product_07 from '../images/laysp.jfif';
import product_08 from '../images/flugel.jfif';
import product_09 from '../images/10flugel.jfif';
import product_10 from '../images/40flugel.jfif';
import product_11 from '../images/redbull.jfif';
import product_12 from '../images/4redbull.jfif';
import product_13 from '../images/6redbull.jfif';
import product_14 from '../images/roket.jfif';
import product_15 from '../images/petr.jfif';
import product_16 from '../images/safari.jfif';
import product_17 from '../images/bcola.jfif';
import product_18 from '../images/brazz.jfif';
import product_19 from '../images/smir.jfif';
import product_20 from '../images/zww.jfif';
import product_21 from '../images/rozw.jfif';
import product_22 from '../images/rodw.jfif';
import product_23 from '../images/cola.jfif';
import product_24 from '../images/6cola.jfif';
import product_25 from '../images/colaf.jfif';
import product_26 from '../images/hertogkrat.jfif';
import product_27 from '../images/desp6.jfif';
import product_28 from '../images/corona6.jfif';
import product_29 from '../images/hertog6.jfif';

const products = [
  {
    id: '01',
    title: 'Heineken Krat',
    price: 11.0,
    price1: 11.0,
    image01: product_01,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ',
  },

  {
    id: '02',
    title: 'Heineken Tray',
    price: 115.0,
    image01: product_02,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '03',
    title: 'Heineken 6 pack 33cl',
    price: 110.0,
    image01: product_03,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '04',
    title: 'Corona',
    price: 110.0,
    image01: product_04,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '05',
    title: 'Desperados',
    price: 24.0,
    image01: product_05,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },
  {
    id: '06',
    title: 'Lays Naturel',
    price: 24.0,
    image01: product_06,
    category: 'Chips',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '07',
    title: 'Lays Paprika',
    price: 115.0,
    image01: product_07,
    category: 'Chips',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '08',
    title: 'Flugel Flesje 20ml',
    price: 110.0,
    image01: product_08,
    category: 'Flugel',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '09',
    title: '10 Flugel Flesje 20ml',
    price: 110.0,
    image01: product_09,
    category: 'Flugel',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '10',
    title: '40 Flugel Flesje 20ml',
    price: 24.0,
    image01: product_10,
    category: 'Flugel',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '11',
    title: 'Red Bull 250ml ',
    price: 35.0,
    image01: product_11,
    category: 'Energy Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '12',
    title: '4 Red Bull',
    price: 35.0,
    image01: product_12,
    category: 'Energy Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '13',
    title: '6 Red Bull',
    price: 35.0,
    image01: product_13,
    category: 'Energy Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '14',
    title: 'Rocket Shot (Rocketje) alc 14%',
    price: 35.0,
    image01: product_14,
    category: 'Mix Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '15',
    title: 'Petrikov Vodka Juicy alc 12.5%',
    price: 35.0,
    image01: product_15,
    category: 'Mix Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '16',
    title: 'Safari Senza Exotic Fruit alc 14.9%',
    price: 35.0,
    image01: product_16,
    category: 'Mix Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '17',
    title: 'Bacardi Rum & Cola 250ml alc 7%',
    price: 35.0,
    image01: product_17,
    category: 'Mix Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '18',
    title: 'Bacardi Razz & up 250ml alc 7%',
    price: 35.0,
    image01: product_18,
    category: 'Mix Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '19',
    title: 'Smirnoff Ice 250ml alc 4%',
    price: 35.0,
    image01: product_19,
    category: 'Mix Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '20',
    title: 'Zoete Witte Wijn 70cl',
    price: 35.0,
    image01: product_20,
    category: 'Wijn',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '21',
    title: 'Rose Wijn 70cl',
    price: 35.0,
    image01: product_21,
    category: 'Wijn',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '22',
    title: 'Rode Wijn 70cl',
    price: 35.0,
    image01: product_22,
    category: 'Wijn',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '23',
    title: 'Cola',
    price: 35.0,
    image01: product_23,
    category: 'Fris Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '24',
    title: '6 Pack Cola',
    price: 35.0,
    image01: product_24,
    category: 'Fris Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '25',
    title: 'Fles 1.5 Liter Cola',
    price: 35.0,
    image01: product_25,
    category: 'Fris Dranken',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '29',
    title: 'Hertog 6 Pack',
    price: 35.0,
    image01: product_29,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '26',
    title: 'Hertog Krat',
    price: 19.0,
    image01: product_26,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '27',
    title: 'Desperados 6 Pack',
    price: 35.0,
    image01: product_27,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },

  {
    id: '28',
    title: 'Corona 6 Pack',
    price: 35.0,
    image01: product_28,
    category: 'Bier',

    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.',
  },
];

export default products;
