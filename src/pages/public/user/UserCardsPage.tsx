import { useState } from "react";
import PublicNav from "../../../components/public/PublicNav";
import UserAccountMenu from "../../../components/public/UserAccountMenu";
import Button from "../../../components/common/Button";
import PageTitle from "../../../components/common/PageTitle";

interface CardItem {
  id: number;
  number: string;
  expiration: string;
}

function UserCardsPage() {
  const [cards, setCards] = useState<CardItem[]>([
    { id: 1, number: "**** **** **** 1234", expiration: "12/25" },
    { id: 2, number: "**** **** **** 5678", expiration: "07/24" },
  ]);

  const removeCard = (id: number) => {
    setCards((current) => current.filter((card) => card.id !== id));
  };

  return (
    <>
      <PageTitle title="Perfil del cliente - Tarjetas asociadas | Paracas XP" />
      <PublicNav />
      <main className="min-h-[calc(100vh-128px)] bg-[#4b8eb7] px-6 py-12">
        <section className="mx-auto flex max-w-[1040px] items-start gap-10 rounded-[6px] border border-[#111] bg-[#d84b4e] px-12 py-10 text-white">
          <UserAccountMenu active="Tarjetas Asociadas" />

          <div className="min-w-0 flex-1">
            <h1 className="m-0 border-b border-dashed border-white/70 pb-3 text-[18px] font-semibold">
              Mis tarjetas
            </h1>

            <div className="mt-8">
              <h2 className="m-0 text-[18px] font-semibold">Tarjetas:</h2>
              <Button
                type="button"
                variant="primary"
                width="140px"
                className="mt-3"
              >
                Añadir Tarjeta
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              {cards.map((card) => (
                <article
                  key={card.id}
                  className="flex h-[70px] items-center justify-between rounded-[6px] border border-[#111] bg-[#4b8eb7] px-4"
                >
                  <p className="m-0 text-[15px] font-semibold">
                    {card.number} - Expiración: {card.expiration}
                  </p>
                  <div className="flex gap-3">
                    <Button type="button" variant="danger" width="60px">
                      Ver
                    </Button>
                    <Button type="button" variant="danger" width="70px">
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      width="82px"
                      onClick={() => removeCard(card.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserCardsPage;
