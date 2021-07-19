class Order:
  def __init__(self,oid,aid,km,price,status):
    self.oid=oid
    self.aid=aid
    self.km=km
    self.price=price
    self.status=status
  def getDeliveryFee(self):
    fee=0
    if self.km>10 :
      fee=0.2*self.price
    elif self.km>=5 and self.km<=10:
      fee=0.1*self.price
    elif self.km<5 and self.km>=0:
      fee=0.05*self.price
    return fee
    
class DeliveryPartner:
    def __init__(self,olist):
      self.olist=olist
    
    def getMatchingOrders(self,n):
        for i in self.olist:
            dfee=i.getDeliveryFee()           
            if i.status.lower()=="Received".lower() and dfee<=n:
                i.status="Accepted"
     
    def getOrdersToDeliver(self):
        for i in self.olist:
            dfee=i.getDeliveryFee()
            if i.status.lower()=="Accepted".lower():
                i.status="Out for delivery"
        return olist

if __name__=="__main__":
  t=int(input())
  olist=[]
  for i in range(t):
    oid=int(input())
    aid=int(input())
    km=int(input())
    price=int(input())
    olist.append(Order(oid,aid,km,price,"Received"))
  obj=DeliveryPartner(olist)
  fee_given=int(input())
  
  obj.getMatchingOrders(fee_given)
  l=obj.getOrdersToDeliver()
  if len(l)==0:
      print("No order can be delivered")
  else:
      print("Details of out of delivery orders")
      for j in l:
          print(j.oid,j.status)
      print("The order details")
      for k in olist:
          print(k.oid,k.getDeliveryFee(),k.status)
  