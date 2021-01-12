import React, { Component } from 'react';

import { Cards, Charts, Countrypicker } from './components';
import styles from './app.module.css';
import { fetchData } from './api';
import coronaImage from '../src/images/covid.png'
export class app extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      country:""
    };
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
   
    this.setState({ data: fetchedData });
  }

  handleCountrychange=async (country)=>{
   
    const fetchCountryData= await fetchData(country);
     console.log(fetchCountryData);
    this.setState({data:fetchCountryData, country:country})
  }

  
  render() { 
    const { data,country} = this.state;
    console.log(data);
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="Covid 19"/>
        <Cards data={data} />
        <Countrypicker handleCountrychange={this.handleCountrychange}/>
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default app;
