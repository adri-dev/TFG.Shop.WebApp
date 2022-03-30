import React, { useState, useEffect } from 'react';
import { catalogService } from '../shared/catalog.service';
import { Tabs, Tab } from 'react-bootstrap';
import Products from './Products';

export default function Home(){
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getAllCategories = async () => {
          const response = await catalogService.getAllCategories();

          setCategories(response);
          if(response && response.length > 0) {
            setSelectedCategory(response[0].id.toString());
          }
          else {
            setSelectedCategory('');
          }
        }

        getAllCategories();
    }, []);

    return <Tabs activeKey={selectedCategory} className="mb-3" onSelect={(e) => setSelectedCategory(e)}>
              {categories && categories.map(c => 
                <Tab eventKey={c.id} title={c.name}>
                    <Products categoryId={selectedCategory} />
                </Tab>)}
            </Tabs>
    ;
}
