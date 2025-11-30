import Box from "@mui/material/Box";

function GreekColumn({left}) {
  return (
    <Box width={'8vw'} height={'100vh'} zIndex={'10'} position={'fixed'} top={'8vh'} left={left} display={{xs: 'none', lg: 'block'}} >
      <Box height={'2vh'} width={'100%'} margin={'auto'} backgroundColor={'background.paper'} border={'1px solid'} borderColor={'primary.main'}/>

      <Box height={'2vh'} width={'80%'} margin={'auto'} backgroundColor={'background.paper'} border={'1px solid'} borderColor={'primary.main'}/>

      <Box height={'84vh'} width={'60%'} margin={'auto'} backgroundColor={'background.paper'} border={'1px solid'} borderColor={'primary.main'}>

        <Box height={'84vh'} width={'70%'} margin={'auto'} border={'1px solid'} borderColor={'primary.main'}>

          <Box height={'84vh'} width={'40%'} margin={'auto'} border={'1px solid'} borderColor={'primary.main'}></Box>

        </Box>

      </Box>

      <Box height={'2vh'} width={'80%'} margin={'auto'} backgroundColor={'background.paper'} border={'1px solid'} borderColor={'primary.main'}/>

      <Box height={'2vh'} width={'100%'} margin={'auto'} backgroundColor={'background.paper'} border={'1px solid'} borderColor={'primary.main'}/>
    </Box>
  )
}

export default function GreekColumns({ children }) {
  return (
    <Box>
      <GreekColumn left={'2vw'} />
      {children}
      <GreekColumn left={'90vw'} />
    </Box>
  )
}