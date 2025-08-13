import { Button } from "@src/components/ui/button";
import { Card, CardContent } from "@src/components/ui/card";

interface WishlistItemProps {
  id: string;
  imageUrl: string;
  title: string;
  link: string;
  price: string;
  currency?: string;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  imageUrl,
  title,
  link,
  price,
  currency = "C$",
}) => {
  const handleDelete = () => {
    console.log("Deleted:", id);
  };

  return (
    <Card className="flex flex-row p-0 m-0">
      {/* Left: Image */}
      <div className="w-40 h-40 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Details */}
      <CardContent className="flex flex-col flex-1 p-0 m-0">
        <div>
          <a className="text-lg font-semibold" href={link}>
            {title}
          </a>
          <div>
            {currency}
            {price}
          </div>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistItem;
