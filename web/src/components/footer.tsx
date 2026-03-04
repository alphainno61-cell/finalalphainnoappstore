import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Alphainno App Store</h3>
            <p className="text-sm text-muted-foreground">
              Universal App Marketplace for all platforms
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/apps" className="text-muted-foreground hover:text-foreground">Apps</Link></li>
              <li><Link href="/games" className="text-muted-foreground hover:text-foreground">Games</Link></li>
              <li><Link href="/movies" className="text-muted-foreground hover:text-foreground">Movies</Link></li>
              <li><Link href="/library" className="text-muted-foreground hover:text-foreground">Library</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Developer</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/developer/upload" className="text-muted-foreground hover:text-foreground">Upload App</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/settings" className="text-muted-foreground hover:text-foreground">Settings</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Alphainno App Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
