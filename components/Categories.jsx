import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Categories.module.css';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    // smt
    <div className={styles.container}>
      <h3>Categories</h3>
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`}>
          <a className={styles.category}>{category.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
