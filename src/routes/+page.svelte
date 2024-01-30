<script>
    import profilePicture from "$lib/assets/profile.png";

    let character = {
        profilePicture: profilePicture,
        name: 'John Doe',
        class: 'Wizard',
        level: 5,
        race: 'Human',
        hair_color: 'Brunette',
        skin_color: 'Dark',
        eye_color: 'Brown',
        height: '220',
        weight: '220',
        appearance: 'Tall with brown hair and blue eyes',
    };
</script>

<div class="section">
    <div class="container">
        <div class="basic">
            <div class="character-image image">
                <img src={character.profilePicture} alt="profile picture of character" />
            </div>
            
            <h1>{character.name}</h1>
            <article>
                <p>Level: {character.level}</p>
                <p>Race: {character.race}</p>
                <p>Class: {character.class}</p>
            </article>
        </div>
        
        <div class="apperance">
            <p>Hair: {character.hair_color}</p>
            <p>Eye color: {character.eye_color}</p>
            <p>Skin color: {character.skin_color}</p>
            <p>Weight: {character.weight}</p>
            <p>height: {character.height}</p>
        </div>
    </div>
</div>
