import Project from "../../schema/Project/Project.js";
import User from "../../schema/User/User.js";

class projectController {
  addProject = async (req, res) => {
    console.log(req.body);
    
    const { userEmail } = req.body;
    try {
      const client = await User.findOne({ userEmail });
      if (!client) {
        return res
          .status(404)
          .json({ Error: `user does't exist with ${userEmail}` });
      }
      const team = await User.find({ userRole: "admin" }, "_id");
      const projectModel = await Project.create(req.body);
      projectModel.teams.push(...team.map((admin) => admin._id));
      projectModel.save();
      client.currentProjects.push(projectModel);
      client.save();
      return res.status(200).json(projectModel);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  getAllProject = async (req, res) => {
    try {
      return res.status(200).json(await Project.find({}));
    } catch (err) {
      return res.status(501).json(err);
    }
  };

  updateProject = async (req, res) => {
    try {
      const updateProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json({ Message: updateProject });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  deleteProject = async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (project) {
        return res
          .status(200)
          .json({ Message: `Product deleted with ID ${project.id}` });
      }
      return res
        .status(401)
        .json({ MessageError: `User Does't exist with id ${req.params.id}` });
    } catch {}
  };

  singleProject = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        return res.status(200).json(project);
      }
      return res.status(401).json({
        MessageError: `User Does't exist with id ${req.params.id}`,
      });
    } catch {}
  };

  updateWizard = async (req, res) => {
    try {
      let project = await Project.findById(req.params.id);
      project.wizard = { ...project.wizard, ...req.body };

      if (req.body.maintains === "done") {
        const user = await User.findOne({ userEmail: project.userEmail });
        if (user) {
          user.currentProjects = user.currentProjects.filter(
            (projId) => projId.toString() !== project._id.toString()
          );
          if (!user.pastProjects.includes(project._id)) {
            user.pastProjects.push(project._id);
          }
          await user.save();
        }
      }
      await project.save();
      return res.status(200).json(project);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

export default new projectController();
