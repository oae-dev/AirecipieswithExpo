import Categaries from '@/App/component/Categaries';
import GenrateRecipies from '@/App/component/GenrateRecipies';
import HomeHeader from '@/App/component/HomeHeader';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../../services/colors';



const Home = () => {



  return (
    <FlatList data={[]}
    style={styles.container}
    ListHeaderComponent={
       <ScrollView>

      {/* HomeHeader */}
      <HomeHeader />
      {/* Resipies genrateer */}
      <GenrateRecipies/>
      {/* catagories */}
      <Categaries />

    </ScrollView>
    }
    renderItem={null}
    />

  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor: colors.Primary,
  },
});

export default Home;
