import { useState } from "react"

const SearchForm = () => {

    const [searchValue, setSearchValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchValue('')
    }

    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search..."
                    required
                    onChange={handleSearch}
                    value={searchValue}
                />
                <button>Search</button>
            </form>
        </div>
    );
}

export default SearchForm;