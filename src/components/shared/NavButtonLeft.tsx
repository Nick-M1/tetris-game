import {Link} from "react-router-dom";
import ArrowLeft from "../icons/ArrowLeft";

type Props = {
    text: string
    to: string
}
export default function NavButtonLeft({ text, to }: Props) {
    return (
        <Link to={to} className='text-white absolute top-0 left-0 group flex items-center p-3'>
            <ArrowLeft width={30} className='mr-2 group-hover:animate-bounceRight'/> {text}
        </Link>
    )
}