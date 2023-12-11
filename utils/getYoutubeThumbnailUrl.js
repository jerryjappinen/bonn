export default (videoId, lowResolution) => {
  return 'https://img.youtube.com/vi/' + videoId + '/' + (lowResolution ? 'hqdefault' : 'maxresdefault') + '.jpg'
}
