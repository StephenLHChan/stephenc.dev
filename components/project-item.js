import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Text,
  Link,
  Heading,
  Badge,
  Image,
  useColorModeValue,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const ProjectItem = ({ id, title, description, thumbnail }) => {
  return (
    <Box w="100%" textAlign="center" mb={6}>
      <NextLink href={`/projects/${id}`} passHref scroll={false}>
        <LinkBox>
          <Box
            borderRadius="lg"
            borderWidth="1px"
            borderColor={useColorModeValue('white')}
            overflow="hidden"
          >
            <NextImage
              src={thumbnail}
              alt="title"
              className="project-item-thumbnail"
              placeholder="blur"
            />
            <LinkOverlay href={`/projects/${id}`} target="_blank">
              <Text mt={2} fontSize={20}>
                {title}
              </Text>
              <Text fontSize={14} mb={4}>
                {description}
              </Text>
            </LinkOverlay>
          </Box>
        </LinkBox>
      </NextLink>
    </Box>
  )
}

export const Breadcrumb = ({ children }) => (
  <Box>
    <NextLink href="/projects" passHref>
      <Link variant="text-link">Projects</Link>
    </NextLink>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
)

export const Tag = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
)

export const ProjectImage = ({ src, alt }) => (
  <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
)
