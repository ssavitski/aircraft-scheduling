export default [
  {
    show: false,
    msg: 'Destination airport of previous flight should fit to the origin airport of the next flight',
  },
  {
    show: false,
    msg: 'Time between the end of a flight and the beginning of the next one should be not less then 40 min',
  },
  {
    show: false,
    msg: 'Aircraft must be on the ground at midnight',
  },
  {
    show: false,
    msg: 'Hours of arrival time of previous flight can\'t be greater than hours of departure time of next flight',
  },
];