import React from 'react'
import {View} from 'react-native'
import QRCode from 'react-native-qrcode-styled'
import ViewShot from 'react-native-view-shot'
import {LinearGradient} from 'expo-linear-gradient'
import {AppBskyGraphDefs, AppBskyGraphStarterpack} from '@atproto/api'
import {Trans} from '@lingui/macro'

import {Logo} from 'view/icons/Logo'
import {Logotype} from 'view/icons/Logotype'
import {useTheme} from '#/alf'
import {atoms as a} from '#/alf'
import {Text} from '#/components/Typography'

interface Props {
  starterPack: AppBskyGraphDefs.StarterPackView
}

export const QrCode = React.forwardRef<ViewShot, Props>(function QrCode(
  {starterPack},
  ref,
) {
  const t = useTheme()
  const {record} = starterPack

  const gradient =
    t.name === 'light'
      ? [t.palette.primary_500, t.palette.primary_300]
      : [t.palette.primary_600, t.palette.primary_400]

  if (!AppBskyGraphStarterpack.isRecord(record)) {
    return null
  }

  return (
    <ViewShot ref={ref}>
      <LinearGradient
        colors={gradient}
        style={[
          {width: 300, height: 440},
          a.align_center,
          a.px_sm,
          a.py_xl,
          a.rounded_sm,
          a.justify_between,
          a.gap_md,
        ]}>
        <View style={[a.gap_sm]}>
          <Text
            style={[a.font_bold, a.text_3xl, a.text_center, {color: 'white'}]}>
            {record.name}
          </Text>
        </View>
        <Text
          style={[a.font_bold, a.text_center, {color: 'white', fontSize: 18}]}>
          <Trans>Join the conversation</Trans>
        </Text>
        <View style={[a.rounded_sm, a.overflow_hidden]}>
          <QrCodeInner url="https://bsky.app" />
        </View>

        <View style={[a.flex_row, a.align_center, {gap: 5}]}>
          <Text
            style={[
              a.font_bold,
              a.text_center,
              {color: 'white', fontSize: 18},
            ]}>
            <Trans>on</Trans>
          </Text>
          <Logo width={26} fill="white" />
          <Logotype
            width={66}
            fill="white"
            style={{marginTop: 6, marginLeft: 2}}
          />
        </View>
      </LinearGradient>
    </ViewShot>
  )
})

export function QrCodeInner({url}: {url: string}) {
  const t = useTheme()

  return (
    <QRCode
      data={url}
      style={[
        a.rounded_sm,
        {height: 200, width: 200, backgroundColor: '#f3f3f3'},
      ]}
      pieceSize={8}
      padding={20}
      // pieceLiquidRadius={2}
      pieceBorderRadius={4.5}
      outerEyesOptions={{
        topLeft: {
          borderRadius: [12, 12, 0, 12],
          color: t.palette.primary_500,
        },
        topRight: {
          borderRadius: [12, 12, 12, 0],
          color: t.palette.primary_500,
        },
        bottomLeft: {
          borderRadius: [12, 0, 12, 12],
          color: t.palette.primary_500,
        },
      }}
      innerEyesOptions={{borderRadius: 3}}
      logo={{
        href: require('../../../assets/logo.png'),
        scale: 1.2,
        padding: 2,
        hidePieces: true,
      }}
    />
  )
}