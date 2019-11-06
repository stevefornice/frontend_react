import axios from 'axios';

//var context = 'http://210.114.91.91:25714';
var context = 'http://EC2Co-EcsEl-1PZ7P6M30YE5A-881234540.ap-northeast-2.elb.amazonaws.com:25714'

export function getGeodata(geoCode) {
  console.log("geoCode:",geoCode)
  return axios.get(context + '/api/geo/' + geoCode + '/?format=json');

}

export function getGeoCodeList() {
  return axios.get(context + '/api/codes/?format=json');

}



