import React from 'react'
import { client } from '../lib/client' 
import {Product, HeroBanner,FooterBanner} from '../components'


const Home = ({products,bannerData}) => (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>best selling headphones</h2>
        <p>speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product,i)=> <Product key={i} product={product}/> )}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
    </div>
  
  );

  export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
  
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
  
    return {
      props: { products, bannerData }
    }
  }
  

export default Home