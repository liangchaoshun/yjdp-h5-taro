import { View, Text } from '@tarojs/components'
import styles from './contact.module.scss'

const Contact = () => {
  return (
    <View className={styles.container}>
      <View className={styles.title}>contact us</View>
      <View className={styles.communication}>
        <Text className={styles.soft}>phone:</Text>
        <Text className={styles.account} selectable>
          +86-17754528993
        </Text>
      </View>
      <View className={styles.communication}>
        <Text className={styles.soft}>wechat:</Text>
        <Text className={styles.account} selectable>
          +86-17754528993
        </Text>
      </View>
      <View className={styles.communication}>
        <Text className={styles.soft}>whatsapp:</Text>
        <Text className={styles.account} selectable>
          +86-17754528993
        </Text>
      </View>
      <View className={styles.communication}>
        <Text className={styles.soft}>Facebook:</Text>
        <Text className={styles.account} selectable>
          Jessica Yan Liang
        </Text>
      </View>
    </View>
  )
}
export default Contact
