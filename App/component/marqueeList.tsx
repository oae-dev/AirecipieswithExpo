
import { Marquee } from '@animatereactnative/marquee';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

type MarqueeListProps = {
    data: number[],
    speed: number
}


const MarqueeList = (props: MarqueeListProps) => {
    const {height,width} = Dimensions.get('window');
    const myHeight = height/5
    return (
        <View style={[styles.container,{height:height/4.5}]}>
            <Marquee
                speed={props.speed}
            >
                <View style={styles.marquestyle}>
                    {

                        props.data.map((item: number, index) => {
                            return (
                                <View key={index} style={[styles.imageWrapper,{height:myHeight}]}>
                                    <Image source={item} style={styles.img} />
                                </View>

                            );
                        })
                    }
                </View>
            </Marquee>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
   },
    img: {
        width: '100%',
        height: '100%',
    },
    imageWrapper: {
        width: 220,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    marquestyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MarqueeList;
