import { RepositoriesData } from "./types"

interface Props {
  data: RepositoriesData | null
}

const RepositoryList = ({ data }: Props) => {
  return (
    <ul className="w-2/3 max-w-[600px] m-8">
      <li
        key="header"
        className="font-semibold border-b-1 border-b-amber-200 py-2 pl-2 grid grid-cols-[70px_1fr]"
      >
        <p>stars</p>
        <p>name</p>
      </li>
      {data &&
        data.items.map((item) => (
          <li key={item.id} className="border-b-1 border-b-amber-200 py-2 pl-2 hover:bg-gray-100">
            <a href={item.html_url} target="blank" className="grid grid-cols-[70px_1fr]">
              <p> {item.stargazers_count} </p>
              <p> {item.name} </p>
            </a>
          </li>
        ))}
    </ul>
  )
}

export default RepositoryList
