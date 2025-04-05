import { RepositoriesData } from "./types"

interface Props {
  data: RepositoriesData | null
}

const RepositoryList = ({ data }: Props) => {
  return (
    <ul className="w-2/3 max-w-[600px] m-8">
      {data &&
        data.items.map((item) => (
          <li key={item.id} className="border-b-1 border-b-amber-200 py-1">
            <a
              href={item.html_url}
              target="blank"
              className="grid grid-cols-[70px_1fr] hover:text-amber-600"
            >
              <p className="inline-block pr-8"> {item.stargazers_count} </p>
              <p className="font-bold"> {item.name} </p>
            </a>
          </li>
        ))}
    </ul>
  )
}

export default RepositoryList
