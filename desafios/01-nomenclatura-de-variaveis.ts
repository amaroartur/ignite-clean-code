// Nomenclatura de variáveis

const categoriesList = [
  {
    title: 'New',
    followers: 0
  },
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUserCategory(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userGithubData = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (userGithubData.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const jsonUserGithubData = await userGithubData.json()

  const categoriesSortedByFollowers = categoriesList.sort((categoryA, categoryB) =>  categoryB.followers - categoryA.followers); 

  const userCategory = categoriesSortedByFollowers.find(category => jsonUserGithubData.followers > category.followers)

  const userData = {
    githubUsername,
    category: userCategory.title
  }

  return userData
}

getUserCategory({ query: {
  username: 'amaroartur'
}}, {})