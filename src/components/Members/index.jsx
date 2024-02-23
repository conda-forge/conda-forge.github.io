import Link from "@docusaurus/Link";

export default function Members(data) {
    let members = data.data;
    members.sort(function(a, b) {
        const nameA = a.name
        const nameB = b.name
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return (
        <ul>
            {members.map(member => {
            let link = `https://github.com/${member.github_username}`;
            return (
                <li key={member.email}>
                    <Link to={link}>
                        {member.name}, @{member.github_username}
                    </Link>
                </li>
            );
            })}
        </ul>
    );
}
