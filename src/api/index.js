import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changableUrl=url;
  if(country){
    changableUrl=`${url}/countries/${country}`;
  }
  try {
    const { data:{confirmed,recovered,deaths,lastUpdate} } = await axios.get(changableUrl);

   
    return {confirmed,recovered,deaths,lastUpdate};
  } catch (error) {}
};

export const fetchDaily = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
   
    const modifiedData = data.map((dailydata) => ({
      confirmed: dailydata.confirmed.total,
      deaths: dailydata.deaths.total,
      date: dailydata.reportDate,
    }));
    console.log(modifiedData);
    return modifiedData;
  } catch (error) {}
};


export const fetchCountries=async()=>{
  try {
    const {data:{countries}}=await axios.get(`${url}/countries`);

    return countries.map((country)=>country.name)
  } catch (error) {
    
  }
}