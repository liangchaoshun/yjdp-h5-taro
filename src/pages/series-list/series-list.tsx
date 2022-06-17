import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { fetchGoodsBySeriesId } from '@/api/category'
import { AtMessage } from 'taro-ui'
import { getUrlParams } from '@/util'

import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/message.scss'
import styles from './series-list.module.scss'
import noDataSvg from '@/assets/images/cart-no-data.svg'

const SeriesList = () => {
  const [goodsList, setGoodsList] = useState([])

  useEffect(() => {
    const urlSearchParams = getUrlParams(window.location.href)
    if (!urlSearchParams?.id) {
      Taro.atMessage({
        message: 'Miss the product id, please select the product again',
        type: 'error',
        duration: 10000
      })
    } else {
      fetchGoodsList(urlSearchParams.id)
    }
  }, [])

  // 获取商品列表
  const fetchGoodsList = async (series_id: string) => {
    try {
      const result = await fetchGoodsBySeriesId({ series_id })
      const { data, error_code } = result
      if (error_code === '00') {
        setGoodsList(data.res)
      }
    } catch (error) {
      console.log('fetchGoodsList error => ', error)
    }
  }

  const go2GoodDetail = (id: string) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }

  return (
    <View className={styles['goods-list']}>
      {goodsList.length ? (
        <View>
          {goodsList.map((item: any) => (
            <View
              className={styles.goods}
              key={item._id}
              onClick={() => go2GoodDetail(item._id)}
            >
              <View className={styles.img}>
                <Image src={item.icon_url} />
              </View>
              <View className={styles['desc-info']}>
                <View className={styles.desc}>{item.desc_en}</View>
                <View className={styles['price-info']}>
                  <Text className={styles.currency}>￥</Text>
                  <Text className={styles['price-txt']}>{item.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className={styles['no-data']}>
          <Image src={noDataSvg} style="width: 100%;height: 100%;" />
        </View>
      )}
      <View className={styles.back} onClick={() => Taro.navigateBack()}>
        <View className="at-icon at-icon-chevron-left" />
      </View>
      <AtMessage />
    </View>
  )
}

export default SeriesList
