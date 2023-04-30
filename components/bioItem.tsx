import { Box, Text } from '@chakra-ui/react'

const BioItem = ({ id, year, content }) => {
  return (
    <Box key={id} display={'flex'} pb={2}>
      <Box w="3.4em">
        <Text w={'3.4em'} fontWeight={'bold'}>
          {year}
        </Text>
      </Box>
      <Box ml={10}>{content}</Box>
    </Box>
  )
}

export default BioItem
