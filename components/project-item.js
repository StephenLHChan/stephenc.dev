import Image from 'next/image'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'

const ProjectItem = ({ title, description, thumbnail }) => {
  return (
    <Box w="100%" textAlign="center" mb={6}>
      <Box
        borderRadius="lg"
        borderWidth="1px"
        borderColor={useColorModeValue('white')}
        overflow="hidden"
      >
        <Image
          src={thumbnail}
          alt="title"
          className="project-item-thumbnail"
          placeholder="blur"
        />
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
        <Text fontSize={14} mb={2}>
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default ProjectItem
