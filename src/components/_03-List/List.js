import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './list.module.scss';

const List = ({ data, onSubmit, filterValue }) => {
  const [listData, setListData] = useState(data);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const deleteItem = id => {
    const newData = listData.filter(item => item.id !== id);
    setListData(newData);
    onSubmit(newData);
  };

  return (
    <ul className={css['list']}>
      {listData
        .filter(item => {
          return item.name.toLowerCase().includes(filterValue.toLowerCase());
        })
        .map(item => {
          return (
            <li className={css['list__item']} key={item.id}>
              {item.name}: {item.number}
              <button type="button" onClick={() => deleteItem(item.id)}>
                {' '}
                Delete{' '}
              </button>
            </li>
          );
        })}
    </ul>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default List;
