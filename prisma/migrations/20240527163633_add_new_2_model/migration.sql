-- CreateTable
CREATE TABLE "BilSale" (
    "id" SERIAL NOT NULL,
    "customername" TEXT NOT NULL,
    "customerphone" TEXT NOT NULL,
    "customeraddress" TEXT NOT NULL,
    "payDate" TIMESTAMP(3) NOT NULL,
    "paytime" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'wait',

    CONSTRAINT "BilSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSaleDetail" (
    "id" SERIAL NOT NULL,
    "productid" INTEGER NOT NULL,
    "billsaleid" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "BillSaleDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSaleDetail" ADD CONSTRAINT "BillSaleDetail_billsaleid_fkey" FOREIGN KEY ("billsaleid") REFERENCES "BilSale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
