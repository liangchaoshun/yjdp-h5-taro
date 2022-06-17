import { useEffect, useState } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { fetchGoddsDetail } from '@/api/detail'
import { AtMessage } from 'taro-ui'
import { getUrlParams } from '@/util'
import type { GoodsInfoType } from '@/@types/shared'

import Taro from '@tarojs/taro'
import styles from './detail.module.scss'
import "taro-ui/dist/style/components/icon.scss"
import 'taro-ui/dist/style/components/message.scss'
import invalidSvg from '@/assets/images/invalid-goods-illu.svg'

const Detail = () => {
  // const [pid, setPid] = useState('')
  const [tip, setTip] = useState('loading...')
  const [detailData, setDetailData] = useState<GoodsInfoType | null>(null)

  useEffect(() => {
    const urlSearchParams = getUrlParams(window.location.href)
    if (urlSearchParams?.id && urlSearchParams.id !== 'undefined') {
      // setPid(urlSearchParams.id)
      fetchData(urlSearchParams.id)
    } else {
      Taro.atMessage({
        message: "Miss the product id, please select the product again",
        type: 'error',
        duration: 10000
      })
      setTip('Miss the product id')
    }
  }, [])


  // 获取商品信息
  const fetchData = async (id: string) => {
    try {
      const result = await fetchGoddsDetail({ id })
      const {
        data,
        error_code
      } = result;
      if (error_code === '00') {
        setDetailData(data.res)
        setTip(data.res === null ? 'Sorry, this item has expired' : 'loading...')
      }

    } catch (error) {
      console.log('fetchGoddsDetail error => ', error);
    }
  }

  return (
  <View className={styles['detail-container']}>
    {
      detailData !== null ?
      <View className={styles['valid-view']}>
        <View className={styles.header}>
          <View className={styles['detail-banner']}>
            <Swiper className={styles.swiper} duration={500} indicator-dots indicator-color="rgba(221, 221, 221, .6)"
              indicator-active-color="#ff6347">
                {
                  detailData?.banner_url.map((url: string) => <SwiperItem key={url}>
                <View className={styles['banner-item']}>
                  <Image src={ url } />
                </View>
              </SwiperItem>) ?? []
                }

            </Swiper>
          </View>
          <View className={styles['price-area']}>
            <View className={styles['price-info']}>
              <Text className={styles.price}>￥{detailData.price}</Text>
              <Text className={styles.unit}>(RMB)</Text>
            </View>
            <View className={styles.desc}>{detailData.desc_en}</View>
          </View>
        </View>
        <View className={styles.section}>
          {
            detailData?.desc_url?.length ? <View>
            {
              detailData.desc_url.map((url: string) => (
                <View className={styles['img-wrapper']} key={url}>
                  <Image mode="widthFix" src={ url} />
                </View>
                )
              )
            }
          </View> : <View className={styles['empty-data']}>no data</View>
          }
        </View>
      </View> :
      <View className={styles['invalid-view']}>
        <View>
          <Image src={invalidSvg} />
          <View className={styles['invalid-text']}>{ tip }</View>
        </View>
      </View>
  }
  <View className={styles.back} onClick={() => Taro.navigateBack()}>
    <View className='at-icon at-icon-chevron-left' />
  </View>
  <AtMessage />
</View>
)}

export default Detail
