
const announcements = [
    "Get 10% off on your First Order !!!",
    "Discover great finds from sellers across India",
    "Explore Groceries and Food & Snacks",


]

export default function AnnouncementBar() {
    return(
        <div className="flex min-h-12 items-center justify-center bg-indigo-600 px-4 py-2
        text-center text-xs font-medium text-white sm:text-sm">
            <div className="animate-marquee flex w-max whitespace-nowrap">
                {[
                    ...announcements, ...announcements].map((message, index) => (
                        <span key={index} className="mx-10">
                            {message}
                            <span className="ml-8 text-indigo-200">+</span>
                        </span>

                    ))}
            </div>
        </div>
    )
}