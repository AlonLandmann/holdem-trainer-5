import Button from "@/components/_ui/Button";
import { useRouter } from "next/router";

export default function AppNavbarItem({ icon, text, href, onClick, extendedView }) {
    const router = useRouter();
    const currentNav = router.pathname.split("/")[2];
    const targetNav = href && href.split("/")[2];
    const isSelected = currentNav === targetNav;

    function handleClick() {
        if (href) {
            router.push(href);
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <Button
            theme="sidenav"
            utilClasses={isSelected ? "text-white bg-neutral-800" : ""}
            icon={icon}
            text={extendedView ? text : null}
            onClick={handleClick}
        />
    );
};