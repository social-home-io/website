---
title: "Un chat dans le fil, un filet de sécurité pour les foyers jumelés et des synchronisations plus légères"
description: Chaque foyer et chaque espace a désormais son propre chat, les foyers jumelés peuvent se rabattre sur le GFS quand aucun chemin direct ne les relie, et la synchronisation des espaces n'envoie plus que ce qui a changé. Dans Social Home 2026.10.8 et 2026.10.9.
date: 2026-10-09
author: L'équipe Social Home
image: /blog/2026-10-chat-sync/household-chat.png
imageAlt: Le fil du foyer avec l'onglet Chat ouvert, montrant des messages des membres de la famille, une @mention et un séparateur Nouveaux messages
order: 50
---

Deux versions en deux jours, et trois changements que vous remarquerez
au quotidien : votre foyer a un chat directement dans le fil, les
foyers jumelés se joignent même quand la ligne directe fait défaut, et
garder les espaces partagés à jour coûte beaucoup moins.

_Toutes les captures ci-dessous montrent des données d'exemple._

## Un chat pour tout le foyer

« Le dîner est prêt. » « Quelqu'un peut vérifier le chauffage ? »
« Pizza vendredi ? » Tous les messages ne méritent pas une
publication. Le fil a maintenant un sélecteur **Feed | Chat** en haut,
et derrière se trouve un chat que tout votre foyer peut lire. Il
fonctionne comme n'importe quel chat de groupe : @mentions, réactions,
modifications, pièces jointes et une ligne **Nouveaux messages** là où
vous vous étiez arrêté. Vous pouvez le mettre en sourdine ou n'être
notifié que lorsqu'on vous mentionne.

Le chat du foyer ne quitte jamais votre maison. Il n'est pas envoyé
aux foyers jumelés et n'encombre pas votre boîte Chats. Un
administrateur peut le désactiver dans les réglages du foyer ; le fil
redevient alors exactement comme avant.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/household-chat.png"><img src="/blog/2026-10-chat-sync/household-chat.png" alt="Le fil du foyer avec l'onglet Chat ouvert, montrant des messages des membres de la famille, une @mention et un séparateur Nouveaux messages" width="1280" height="720" loading="lazy"></a><figcaption><b>Feed | Chat</b>Un seul chat pour toute la maison, à un geste du fil.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-chat-sync/space-chat-phone.png"><img src="/blog/2026-10-chat-sync/space-chat-phone.png" alt="Le chat d'un espace sur un téléphone, avec des messages de membres de trois foyers, un message modifié et une réponse supprimée" width="390" height="844" loading="lazy"></a><figcaption><b>Le chat d'un espace</b>Des membres de trois foyers, une seule conversation.</figcaption></figure>
</div>

**Les espaces ont le même sélecteur.** Chaque espace a désormais un
chat partagé par ses membres, d'un foyer à l'autre : le club de
lecture peut fixer la prochaine date sans publier pour autant. Les
abonnés d'un espace ne voient pas le chat et ne le reçoivent pas. Par
défaut, il ne vous notifie que lorsqu'on vous mentionne, les
modérateurs de l'espace peuvent retirer n'importe quel message, et un
espace archivé garde son chat lisible mais fermé. Pour l'instant, le
chat d'espace est en texte seul. Le propriétaire peut le désactiver
dans les réglages de l'espace.

<details class="tech">
<summary>Sous le capot</summary>

Le chat du foyer est un DM de groupe ordinaire avec une portée foyer :
il réutilise les messages, mentions, réactions, la sourdine et l'état
de lecture, mais la diffusion sortante l'ignore et chaque gestionnaire
entrant `DM_*` refuse son identifiant. Le chat d'espace voyage sous
forme de quatre nouveaux événements de fédération
(`SPACE_CHAT_MESSAGE_CREATED`, `_UPDATED`, `_DELETED`,
`SPACE_CHAT_REACTION`, protocole v55), scellés comme tous les autres
événements d'espace, et n'est livré qu'aux foyers qui détiennent un
siège en écriture. Les foyers sous v55 sont ignorés. Les nouveaux
membres rattrapent le retard via la synchronisation de l'espace,
suppressions comprises.

</details>

## Un filet de sécurité pour les foyers jumelés

Les foyers jumelés se parlent directement. Quand ce chemin direct
échoue (un routeur capricieux, une adresse qui a changé, un foyer sans
aucune adresse extérieure), les messages attendaient jusqu'ici dans la
file d'envoi qu'il revienne.

Vous pouvez maintenant laisser le [GFS (Global Federation Server)](/fr/docs/glossary/#gfs)
prendre le relais en **solution de repli**. Elle est **désactivée par
défaut** et se règle connexion par connexion, sous **Connexions →
Gérer**. Les deux foyers doivent l'activer, et leurs maisons trouvent
un GFS qu'elles utilisent toutes deux sans se dire à quels serveurs
elles sont connectées. Au jumelage, la nouvelle question **Comment
peuvent-ils vous joindre ?** permet à un foyer sans adresse extérieure
de se jumeler via le GFS. S'il obtient une adresse plus tard, la paire
passe d'elle-même en direct.

Le GFS n'est utilisé que si le chemin direct échoue, et tout ce qu'il
transporte reste scellé. Il peut voir quand et combien vos deux foyers
échangent, et que vous êtes jumelés, jamais ce que vous vous dites.
C'est pourquoi l'application continue de présenter une adresse directe
comme le choix le plus privé.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-chat-sync/gfs-fallback.png"><img src="/blog/2026-10-chat-sync/gfs-fallback.png" alt="Panneau Gérer d'un foyer jumelé avec Use the GFS as a fallback coché, indiquant qu'il est joignable via 1 GFS commun aux deux foyers, et ce que le GFS peut voir" width="1280" height="720" loading="lazy"></a><figcaption><b>Un interrupteur par connexion</b>La ligne d'état dit si cela fonctionne, la note dit ce que voit le GFS.</figcaption></figure>
</div>

Un autre changement côté GFS : la case **Se connecter au GFS** de la
visite d'accueil est désormais cochée d'avance. Décochez-la pour rester
à l'écart du GFS ; vous pouvez vous connecter ou vous déconnecter à
tout moment dans Connexions.

<details class="tech">
<summary>Sous le capot</summary>

Le trafic entre foyers jumelés essaie d'abord le DataChannel WebRTC,
puis la boîte HTTPS, et seulement en cas d'erreur réseau ou de 5xx (ou
sans URL du tout) il passe à tour de rôle par les routes GFS de la
paire. Un 4xx ne bascule jamais. Le GFS ne voit que
`{to_instance, sealed}`. Les GFS communs sont trouvés en envoyant une
sonde à nonce par chacune de nos propres connexions GFS ; une route
n'est enregistrée que si l'accusé revient par le même GFS, si bien
qu'un GFS qui rejoue une sonde ailleurs ne crée rien. Les routes sont
re-sondées toutes les 24 h et expirent après 72 h. Protocole v53
(routes) et v54 (échange de clés pour les paires existantes).

</details>

## Les synchronisations n'envoient que ce qui a changé

Toutes les demi-heures, votre maison fait le point avec les autres
foyers de vos espaces pour que personne ne manque rien. Jusqu'ici,
cela voulait dire renvoyer à chaque fois chaque publication,
commentaire et entrée photo récents. Désormais, chaque foyer n'envoie
que ce qui a changé depuis la dernière synchronisation confirmée par
l'autre côté. Un espace calme ne coûte presque rien.

Deux choses sont devenues plus fiables au passage :

- **Les suppressions atteignent tout le monde.** Une publication, un
  commentaire, un Post-it, un événement, une photo ou une zone
  supprimés atteignent maintenant aussi les foyers qui étaient hors
  ligne à ce moment, au lieu de réapparaître discrètement plus tard.
- **Une sauvegarde restaurée rattrape son retard.** Un foyer restauré
  depuis une sauvegarde plus ancienne reçoit les changements manquants
  à la synchronisation suivante, sans que personne n'ait à appuyer sur
  **Synchroniser maintenant**.

Ce qu'une synchronisation transporte n'est plus coupé à des nombres
fixes. C'est la durée de conservation de l'espace qui décide jusqu'où
elle remonte.

<details class="tech">
<summary>Sous le capot</summary>

Des déclencheurs SQLite tamponnent chaque ligne synchronisée avec un
compteur propre au foyer (`sync_seq`), si bien qu'aucun chemin
d'écriture ne peut l'oublier. L'émetteur garde un repère par foyer et
ne l'avance qu'après un flux que le destinataire déclare `clean` ; un
morceau en échec revient donc la fois suivante. Un foyer restauré
renvoie le dernier instantané qu'il a appliqué (`have_seq`) ;
l'émetteur diffuse à partir du plus petit des deux et ne fait jamais
confiance à une valeur supérieure à la sienne. Un flux complet a
toujours lieu au jumelage, à l'arrivée d'un membre, sur
**Synchroniser maintenant**, après un changement de forme et au moins
une fois par jour. Les suppressions voyagent sous forme de tombstones
sans contenu et sont appliquées avec la même autorité qu'une
suppression en direct. Pas de changement de protocole.

</details>

## Essayez

La solution de repli GFS est dans **Social Home 2026.10.8** ; les chats
et la synchronisation allégée dans **Social Home 2026.10.9**. Pour la
solution de repli et le chat d'espace, les deux foyers ont besoin de la
nouvelle version. Pour en savoir plus sur la façon dont les foyers se
joignent, lisez [Des foyers fédérés](/fr/docs/federation/).
