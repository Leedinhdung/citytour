import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-30 bg-white flex justify-between h-16 items-center gap-4 border-b bg-background px-10 md:px-6">
            <div className="flex items-center gap-2">
                <img src="https://mixivivu.com/_next/image?url=%2Fblack-logo.png&w=384&q=75" alt="" className='h-10' />
            </div>

            <div className='flex w-96 gap-5'>
                <div className="relative ml-auto flex-1 md:grow-0 md:basis-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-72"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {/* <Button
                        variant="outline"
                        size="icon"
                    >
                        <FaSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <FaMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button> */}

                    <Button variant="outline" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>


                </div>
                {/* <UserNav /> */}
            </div>
        </header>
    )
}
export default Header