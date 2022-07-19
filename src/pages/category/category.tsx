import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { View, ScrollView, Image } from '@tarojs/components'
import { fetchAllCategories, fetchSeriesByCategoryId } from '@/api/category'

import styles from './category.module.scss'
import Taro from '@tarojs/taro'

const Category = () => {
  const [menuList, setMenuList] = useState([])
  const [seriesList, setSeriesList] = useState([])
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    fetchMenu()
  }, [])

  // 获取菜单
  const fetchMenu = () => {
    fetchAllCategories()
      .then((res: any) => {
        const { data, error_code } = res
        if (error_code === '00') {
          setMenuList(data.res)
          fetchSeriesData(data.res[currIndex]._id)
        }
      })
      .catch((reason: any) => {
        console.log('fetchAllCategories error => ', reason)
      })
  }

  // 获取系列数据
  const fetchSeriesData = (category_id: string) => {
    fetchSeriesByCategoryId({ category_id })
      .then(res => {
        const { data, error_code } = res
        if (error_code === '00') {
          setSeriesList(data.res)
        } else {
          setSeriesList([])
        }
      })
      .catch(reason => {
        console.log('fetchSeriesByCategoryId error => ', reason)
      })
  }

  const go2SeriessList = (id: string) => {
    // console.log('go2SeriessList => ', id)
    Taro.navigateTo({
      url: `/pages/series-list/series-list?id=${id}`
    })
  }

  // 切换类别
  const tapMenuItem = (index: number, id: string) => {
    // console.log('tapMenuItem => ', index);
    setCurrIndex(index)
    fetchSeriesData(id)
  }

  return (
    <View className={styles['catgegory-container']}>
      <ScrollView scroll-y className={styles.menu}>
        {menuList.map((item: any, index: number) => (
          <View
            className={classNames(styles['menu-item'], {
              [styles['menu-item-active']]: index === currIndex
            })}
            key={item._id}
            onClick={() => tapMenuItem(index, item._id)}
          >
            {item.name_en}
          </View>
        ))}
      </ScrollView>
      <View className={styles.content}>
        <View scroll-y className={styles['series-wrapper']}>
          {seriesList.map((item: any) => (
            <View
              className={styles.series}
              key={item._id}
              onClick={() => go2SeriessList(item._id)}
            >
              <View className={styles['series-img']}>
                <Image src={item.icon_url} />
              </View>
              <View className={styles['series-name']}>{item.name_en}</View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Category
