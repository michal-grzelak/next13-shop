type Props = {
	price: number;
};

export const ProductPrice = ({ price }: Props) => {
	return <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>;
};
